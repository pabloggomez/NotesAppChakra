import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();
const sequelize = new Sequelize(
  process.env.DATABASE_NAME, //database
  process.env.DATABASE_USER, // user
  process.env.DATABASE_PWD, //password
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    port: process.env.DATABASE_PORT,
    logging: false,
  }
);

export default sequelize;
