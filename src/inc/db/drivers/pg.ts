import DriverContract from "../constract/DriverConstract";

class PostgreSqL extends DriverContract {
    setSparator(): Record<string, string> {
        return {
            where: " AND ",
            or: " OR ",
            group_by: ",",
        };
    }
    setSpelling(): Record<
        string,
        (pram: { table: string; columns: string; extra: string[] }) => string
    > {
        return {
            select: ({ table, columns }) => `SELECT ${columns} FROM ${table}`,
            update: ({ table, columns }) => `UPDATE ${table} SET ${columns}`,
            delete: ({ table }) => `DELETE FROM ${table}`,
            where: ({ extra }) => `WHERE ${extra[0]}`,
            insert: ({ table, columns, extra }) =>
                `INSERT INTO ${table} (${columns}) VALUES (${extra})`,
            join: ({ table, extra }) => `${extra[0]} JOIN ${table} ON ${extra[1]} `,
            or: ({ extra }) => `OR ${extra[0]}`,
            group_by: ({ extra }) => `GROUP BY ${extra[0]}`,
            order_by: ({ extra }) => `ORDER BY ${extra[0]}`,
            limit: ({ extra }) => `LIMIT ${extra[0]}`,
            offset: ({ extra }) => `OFFSET ${extra[0]}`,
        };
    }
}

export default PostgreSqL;
