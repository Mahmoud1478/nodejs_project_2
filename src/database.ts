import dotenv from "dotenv";

import { Pool } from "pg";
dotenv.config();
const { host, user, password, database } = process.env;
const port = process.env.port as unknown as number;
const dbProcessor = new Pool({ host, user, password, database, port });

export default async () => {
  try {
    return await dbProcessor.connect();
  } catch (err) {
    throw err;
  }
};
