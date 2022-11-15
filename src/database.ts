import { Pool, PoolClient } from "pg";
import dotenv from "dotenv";

dotenv.config();

let prefix = "";
if (process.env.ENV === "test") {
    prefix = "TEST_";
}
const dbProcessor = new Pool({
    host: process.env[`${prefix}DATABASE_HOST`],
    user: process.env[`${prefix}DATABASE_USER`],
    password: process.env[`${prefix}DATABASE_PASSWORD`],
    database: process.env[`${prefix}DATABASE_NAME`],
    port: parseInt(process.env[`${prefix}DATABASE_PORT`] as string) as number,
});

export default async (): Promise<PoolClient> => {
    try {
        return await dbProcessor.connect();
    } catch (err) {
        throw err;
    }
};
