import { Pool, PoolClient } from "pg";
import connection from "../../database";
import sql from "./sql";

class DB {
    private wheres: [string, string, string | number][] = [];
    private joins: string[] = [];
    private table;
    private query: string;
    private order_By = "";
    private group_by = "";
    private _limit = "";
    private values: (string | number)[] = [];
    private static db: Pool = connection;
    private static connection: PoolClient | undefined;
    private static group_mode = false;

    public constructor(table: string) {
        this.table = table;
        this.query = sql.select(this.table, "*");
    }
    public select(colums: string[] = ["*"]): DB {
        this.query = sql.select(this.table, colums.toString());
        return this;
    }
    public async update<Type>(Entity: Type): Promise<Type[]> {
        try {
            const modColums: string[] = [];
            let valuesLen: number = this.values.length + 1;
            Object.entries(Entity as Record<string, unknown>).map((entry: [string, unknown]) => {
                modColums.push(`${entry[0]} = ($${valuesLen})`);
                this.values.push(entry[1] as string | number);
                valuesLen++;
            });
            this.query = sql.update(this.table, modColums.toString());
            this.build();
            if (!DB.connection) {
                DB.connection = await DB.db.connect();
            }
            const { rows } = await DB.connection.query(this.query + " RETURNING *", this.values);
            return rows;
        } catch (err) {
            throw err;
        } finally {
            if (!DB.group_mode) {
                DB.connection?.release();
                DB.connection = undefined;
            }
            this.reset();
        }
    }
    /**
     * orderBy
     */
    public orderBy(column: string, type = "ASC") {
        this.order_By = ` ORDER BY ${column} ${type}`;
        return this;
    }
    public groupBy(columns: string[]) {
        this.group_by = ` GROUP BY ${columns.toString()}`;
        return this;
    }
    /**
     * limit
     */
    public limit(value: number) {
        this._limit = ` LIMIT ${value}`;
        return this;
    }
    public join(table: string, localKey: string, foreignKey: string) {
        this.joins.push(sql.join(table, localKey, foreignKey));
        return this;
    }
    public async delete<Type>(): Promise<Type[]> {
        try {
            this.query = sql.delete(this.table);
            this.build();
            if (!DB.connection) {
                DB.connection = await DB.db.connect();
            }
            const { rows } = await DB.connection.query(this.query + " RETURNING *", this.values);
            return rows;
        } catch (err) {
            throw err;
        } finally {
            if (!DB.group_mode) {
                DB.connection?.release();
                DB.connection = undefined;
            }
            this.reset();
        }
    }
    public async create<Type>(Entity: Type): Promise<Type> {
        try {
            const values: string[] = [];
            Object.keys(Entity as Record<string, unknown>).forEach(
                (item: string, index: number) => {
                    values.push(`$${index + 1}`);
                }
            );

            if (!DB.connection) {
                DB.connection = await DB.db.connect();
            }
            const { rows } = await DB.connection.query(
                sql.insert(
                    this.table,
                    Object.keys(Entity as Record<string, unknown>).toString(),
                    values.toString()
                ),
                Object.values(Entity as Record<string, unknown>)
            );
            return rows[0];
        } catch (error) {
            throw error;
        } finally {
            if (!DB.group_mode) {
                DB.connection?.release();
                DB.connection = undefined;
            }
            this.reset();
        }
    }
    public where(colum: string, value: string | number, operator = "="): DB {
        this.wheres.push([colum, operator, `($${this.values.length + 1})`]);
        this.values.push(value);
        return this;
    }

    public whereIn(column: string, values: (string | number)[]): DB {
        let values_count: number = this.values.length;
        const placeholder = values.map((item) => {
            values_count++;
            this.values.push(item);
            return `$${values_count}`;
        });
        this.wheres.push([column, "IN", `(${placeholder.toString()})`]);
        return this;
    }
    public async get<Type>(): Promise<Type[]> {
        try {
            this.build();
            if (!DB.connection) {
                DB.connection = await DB.db.connect();
            }
            const { rows } = await DB.connection.query(this.query, this.values);
            return rows;
        } catch (err) {
            throw err;
        } finally {
            if (!DB.group_mode) {
                DB.connection?.release();
                DB.connection = undefined;
            }
            this.reset();
        }
    }
    public async find<Type>(column: string, value: string): Promise<Type | null> {
        this.where(column, value).build();
        try {
            if (!DB.connection) {
                DB.connection = await DB.db.connect();
            }
            const { rows } = await DB.connection.query(this.query, this.values);
            if (rows.length > 0) return rows[0];
            return null;
        } catch (err) {
            throw err;
        } finally {
            if (!DB.group_mode) {
                DB.connection?.release();
                DB.connection = undefined;
            }
            this.reset();
        }
    }
    /**
     * getQuery
     * @return string
     */
    public getQuery() {
        this.build();
        return this.query;
    }

    private build(): void {
        sql.arrangement.forEach((item): void => {
            this.query += this.handle_statement(item);
        });
    }
    public static async group<Type>(
        callback: () => Promise<void | Type | Type[] | null>
    ): Promise<void | Type | Type[] | null> {
        DB.group_mode = true;
        DB.connection = await DB.db.connect();
        const result = await callback();
        DB.connection?.release();
        DB.connection = undefined;
        return result;
    }

    public static async selectRaw<Type>(
        query: string,
        values?: (string | number)[]
    ): Promise<Type[] | Type> {
        try {
            if (!DB.connection) {
                DB.connection = await DB.db.connect();
            }
            const r = await DB.connection?.query(query, values);
            return r?.rows;
        } finally {
            if (!DB.group_mode) {
                DB.connection?.release();
                DB.connection = undefined;
            }
        }
    }
    private reset() {
        this.query = sql.select(this.table, "*");
        this.values = [];
        this.wheres = [];
        this.joins = [];
        return this;
    }
    // public async transcaction<Type>(
    //     callback: (builder: DB, reject: (reson?: unknown) => void) => Promise<Type | Type[] | null>
    // ): Promise<[Type | Type[] | null, null | Error]> {
    //     return new Promise<[Type | Type[] | null, null | Error]>(async (resolve, reject) => {
    //         try {
    //             this.group_mode = true;
    //             this.connection = await this.db.connect();
    //             await this.connection.query("BEGIN");
    //             const result = await callback(this, reject).catch(async (e: Error) => {
    //                 await this.connection?.query("ROLLBACK");
    //                 reject(e);
    //             });
    //             await this.connection.query("COMMIT");
    //             resolve([result as Type | Type[] | null, null]);
    //         } catch (err) {
    //             reject([null, err as Error]);
    //         } finally {
    //             this.connection?.release();
    //         }
    //     }).catch(async (e) => {
    //         await this.connection?.query("ROLLBACK");
    //         return [null, e];
    //     });
    // }

    public static async transcaction(callback: CallableFunction): Promise<[unknown, null | Error]> {
        try {
            DB.group_mode = true;
            DB.connection = await DB.db.connect();
            await DB.connection.query("BEGIN");
            const result = await callback();
            await DB.connection?.query("COMMIT");
            return [result, null];
        } catch (err) {
            await DB.connection?.query("ROLLBACK");
            return [null, err as Error];
        } finally {
            DB.connection?.release();
            DB.connection = undefined;
        }
    }
    private handle_statement(statement: string): string {
        const map: { [x: string]: () => string } = {
            wheres: (): string => {
                if (this.wheres.length) {
                    const result: string[] = [];
                    this.wheres.forEach((item): void => {
                        result.push(item.join(" "));
                    });
                    return sql.where(result.join(" AND "));
                }
                return "";
            },
            joins: (): string => this.joins.join(" "),
            limit: () => this._limit,
            order_by: () => this.order_By,
            group_by: () => this.group_by,
        };
        return map[statement]();
    }
}
export default DB;
