import { RulesObject, ValidationResult } from "../../types/validation";
import connection from "../../database";

export const intiger = (name: string, value: string): ValidationResult => {
  return {
    value: !/^\d+$/.test(value),
    msg: `${name} must be a valid integer`,
  };
};

export const required = (name: string, value: string): ValidationResult => {
  return {
    value: value ? false : true,
    msg: `${name} is required`,
  };
};
export const unique = async (
  value: string,
  table: string,
  column: string,
  id: string | null | undefined = null
): Promise<number> => {
  let query = `SELECT COUNT(*) FROM ${table} WHERE ${column} = ($1)`;
  const values = [value];
  if (id) {
    query += ` AND id != ($2)`;
    values.push(id);
  }
  const conn = await connection();
  const result = await conn.query(query, values);
  conn.release();
  return parseInt(result.rows[0].count);
};

const rules: RulesObject = {
  intiger,
  required,
};

export default rules;
