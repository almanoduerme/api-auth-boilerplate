import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const dbSettings: sql.config = {
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  server: process.env.SQL_SERVER || "localhost",
  database: process.env.SQL_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export { dbSettings };