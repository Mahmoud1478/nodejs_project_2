// export const SELECT_STATEMENT = (colums:string , table:string):string => `select ${colums} from ${table}`;

export default {
  arrangement: ["joins", "wheres"],
  select: (table: string, colums: string): string =>
    `SELECT ${colums} FROM ${table}`,
  update: (table: string, colums: string): string =>
    `UPDATE ${table} SET ${colums}`,
  delete: (table: string): string => `DELETE FROM ${table}`,
  where: (conditions: string): string => ` WHERE ${conditions}`,
  insert: (table: string, colums: string, values: string): string =>
    `INSERT INTO ${table} (${colums}) VALUES (${values}) RETURNING *`,
};
