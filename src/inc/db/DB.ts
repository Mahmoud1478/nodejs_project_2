import { Pool, PoolClient } from "pg";
import connection from "../../database";
import DriverContract from "./constract/DriverConstract";

import sql from "./sql";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const driver: new () => DriverContract = require(`./drivers/${
    process.env.DATABASE_DRIVER || "pg"
}`).default;
class DB {
    private driver: DriverContract = new driver();
    private table;
    private query: string;
    private values: (string | number)[] = [];
    private static db: Pool = connection;
    private static connection: PoolClient | undefined;
    private static group_mode = false;
    private columns: string[] = ["*"];

    public constructor(table: string) {
        this.table = table;
        this.query = sql.select(this.table, "*");
    }
    public select(colums: string[] = ["*"]): DB {
        this.columns = colums;
        this.driver.setAttr("command", "select");
        return this;
    }
    public setCommand(command: string): DB {
        this.driver.setAttr("command", command);
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
    public orderBy(column: string, type = "ASC"): DB {
        this.driver.setAttr("order_by", [column, type]);
        return this;
    }
    public groupBy(columns: string[]): DB {
        this.driver.setAttr("group_by", columns);
        return this;
    }
    public limit(value: number): DB {
        this.driver.setAttr("limit", value);
        return this;
    }
    public offset(value: number): DB {
        this.driver.setAttr("offset", value);
        return this;
    }
    public join(table: string, localKey: string, foreignKey: string): DB {
        this.driver.setAttr("join", {});
        return this;
    }
    public async delete<Type>(): Promise<Type[]> {
        try {
            this.query = sql.delete(this.table);
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
    public where(column: string, value: string | number, operator = "="): DB {
        this.values.push(value);
        this.driver.setAttr("where", [column, operator, `($${this.values.length})`]);
        return this;
    }
    public orWhere(column: string, value: string | number, operator = "="): DB {
        this.values.push(value);
        this.driver.setAttr("or", [column, operator, `($${this.values.length})`]);
        return this;
    }
    public whereIn(column: string, values: (string | number)[]): DB {
        const placeholder = values.map((item) => {
            this.values.push(item);
            return `($${this.values.length})`;
        });
        this.driver.setAttr("where", [column, "IN", `(${placeholder.toString()})`]);
        return this;
    }
    public async get<Type>(): Promise<Type[]> {
        try {
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
        this.where(column, value);
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
    public toSql(): string {
        return this.driver.build(this.table, this.columns.toString());
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
    ): Promise<Type[]> {
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
    private reset(): DB {
        this.query = sql.select(this.table, "*");
        this.values = [];
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
}
export default DB;
