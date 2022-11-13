import { Pool, PoolClient, QueryResult } from "pg";

class Connection {
  private readonly processoer: Pool;
  private connection: PoolClient | undefined;

  public constructor(connection: Pool) {
    this.processoer = connection;
    this.connect();
  }
  public close() {
    this.connection?.release();
    return this;
  }
  public async connect() {
    try {
      this.connection = await this.processoer.connect();
    } catch (err) {
      throw err;
    }
    return this;
  }
  public async execute(query: string, values: (string | number)[]) {
    const result = await await this.connection?.query(query, values);
    this.connection?.release();
    return result?.rows;
  }
}

export default Connection;
