import connection from "../../database";

export type Rule =
    | {
          type: "async";
          name: string;
          callback: (
              value: string | number | boolean,
              attribute: string,
              feild: string,
              passes: (success?: boolean | undefined, message?: string | undefined) => void
          ) => Promise<void>;
          errorMessage: string;
      }
    | {
          type: "sync";
          name: string;
          callback: (value: string | number | boolean, attribute: string, feild: string) => boolean;
          errorMessage: string;
      };

const container: Rule[] = [
    {
        name: "unique",
        type: "async",
        callback: async (
            value: string | number | boolean,
            attribute: string,
            feild: string,
            passes
        ): Promise<void> => {
            const [table, column, id] = attribute.split(","),
                values = [value];
            let query = `SELECT COUNT(*) FROM ${table} WHERE ${column} = ($1)`,
                _passes = true;
            if (id) {
                query += ` AND id != ($2)`;
                values.push(id);
            }
            const conn = await connection.connect();
            const result = await conn.query(query, values);
            conn.release();
            if (parseInt(result.rows[0].count)) {
                _passes = false;
            }
            passes(_passes, `${value} aready taken`);
        },
        errorMessage: ``,
    },
    {
        type: "sync",
        name: "nullable",
        errorMessage: "",
        callback: (): boolean => true,
    },
    {
        type: "async",
        name: "exists",
        errorMessage: "",
        callback: async (value, attribute, feild, passes) => {
            const [table, column, type] = attribute.split(","),
                conn = await connection.connect(),
                values = [value],
                query = `SELECT COUNT(*) FROM ${table} WHERE ${column} = ($1)`;

            if (typeof value == type) {
                let _passes = true;
                const { rows } = await conn.query(query, values);
                conn.release();
                if (!parseInt(rows[0].count)) {
                    _passes = false;
                }
                passes(_passes, `${value} dosen't exist`);
            } else {
                passes(false, `${feild} invaild data type `);
            }
        },
    },
];
export default container;
