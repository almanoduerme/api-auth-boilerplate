import sql from "mssql";
import { dbSettings } from "./db.settings";

const getConnectionSQL = async (): Promise<sql.ConnectionPool> => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool.connect();
  } catch (error) {
    throw new Error(`Error connecting to the database: ${error}`);
  }
}

export { getConnectionSQL };