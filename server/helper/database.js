import { Sequelize, DataTypes, Op } from "sequelize";

export default new Sequelize(
  process.env.DB_NAME,
  String(process.env.DB_USER),
  String(process.env.DB_PASS),
  {
    host: process.env.DB_HOST,
    posrt: Number(process.env.DB_PORT),
    dialect: "mysql",
    logging: false,
  }
);

export { DataTypes, Op };
