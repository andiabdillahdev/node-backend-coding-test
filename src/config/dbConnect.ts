import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DB_HOST = process.env.MYSQL_HOST as string;
const DB_USERNAME = process.env.MYSQL_USER as string;
const DB_PASSWORD = process.env.MYSQL_PASSWORD as string;
const DB_NAME = process.env.MYSQL_DBNAME as string;
const DIALECT = "mysql";

const sequelizeConnection = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DIALECT,
});

sequelizeConnection
  .authenticate()
  .then(() => {
    console.log("db connected");
  })
  .catch((error: any) => {
    console.error("db not conncected", error);
  });

export default sequelizeConnection;
