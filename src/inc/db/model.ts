import connection from "../../database";
import sql from "./sql";

class Model {
    private wheres: [string, string, string | number][] = [];
    private joins: string[] = [];
    private table;
    private query: string;
    private values: (string | number)[] = [];

    public constructor(table: string) {
        this.table = table;
        this.query = sql.select(this.table, "*");
    }
    public select(colums: string[] = ["*"]): Model {
        this.query = sql.select(this.table, colums.toString());
        return this;
    }

    public async update<Type>(columns: { [x: string]: string | number }): Promise<Type[]> {
        const modColums: string[] = [];
        let valuesLen: number = this.values.length + 1;
        for (const column in columns) {
            modColums.push(`${column} = ($${valuesLen})`);
            this.values.push(columns[column]);
            valuesLen++;
        }
        this.query = sql.update(this.table, modColums.toString());
        this.build();
        const conn = await connection();
        const result = await conn.query(this.query + " RETURNING *", this.values);
        conn.release();
        return result.rows[0];
    }

    public async delete<Type>(): Promise<Type[]> {
        this.query = sql.delete(this.table);
        this.build();
        const conn = await connection();
        const result = await conn.query(this.query + " RETURNING *", this.values);
        conn.release();
        return result.rows;
    }
    public async create<Type>(columns: { [x: string]: string | number }): Promise<Type> {
        const values: string[] = [];
        Object.keys(columns).forEach((item: string, index: number) => {
            values.push(`$${index + 1}`);
        });
        const conn = await connection();
        const result = await conn.query(
            sql.insert(this.table, Object.keys(columns).toString(), values.toString()),
            Object.values(columns)
        );
        conn.release();
        return result.rows[0];
    }
    public where(colum: string, value: string | number, operator = "="): Model {
        this.wheres.push([colum, operator, `($${this.values.length + 1})`]);
        this.values.push(value);
        return this;
    }
    public async get<Type>(): Promise<Type[]> {
        this.build();
        const conn = await connection();
        const result = await conn.query(this.query, this.values);
        conn.release();
        return result.rows;
    }
    public async find<Type>(column: string, value: string): Promise<Type | null> {
        this.where(column, value).build();
        const conn = await connection();
        const result = await conn.query(this.query, this.values);
        conn.release();
        if (result.rows.length > 0) return result.rows[0];
        return null;
    }

    private build(): void {
        sql.arrangement.forEach((item): void => {
            this.query += this.handle_statement(item);
        });
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
        };
        return map[statement]();
    }
}
export default Model;
