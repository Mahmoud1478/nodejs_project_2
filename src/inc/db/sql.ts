export default {
    arrangement: ["joins", "wheres", "group_by", "order_by", "limit"],
    select: (table: string, colums: string): string => `SELECT ${colums} FROM ${table}`,
    update: (table: string, colums: string): string => `UPDATE ${table} SET ${colums}`,
    delete: (table: string): string => `DELETE FROM ${table}`,
    where: (conditions: string): string => ` WHERE ${conditions}`,
    insert: (table: string, colums: string, values: string): string =>
        `INSERT INTO ${table} (${colums}) VALUES (${values}) RETURNING *`,
    where_in: (column: string, values: string): string => `${column} in (${values})`,
    join: (table: string, localKey: string, foreignKey: string, type = "INNER"): string =>
        ` ${type} JOIN ${table} ON ${localKey} = ${foreignKey}`,
};
