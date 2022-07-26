import Sequelize from "sequelize";
import {
  NODE_ENV,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_DIALECT,
} from "@config";
import UserModel from "@models/users.model";
import { logger } from "@utils/logger";

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: DB_DIALECT as Sequelize.Dialect,
  host: DB_HOST,
  port: +DB_PORT,
  pool: {
    min: 0,
    max: 50,
    idle: 30000,
    acquire: 60000,
  },
  logQueryParameters: ["development", "test"].includes(NODE_ENV),
  logging: (query, time) => {
    logger.info(time + "ms" + " " + query);
  },
  benchmark: true,
});

const DB = {
  /**
   * Add other models here
   * Then, they can be imported into other files and used like below
   *
   * import DB from "@models/index";
   * const { Users } = DB;
   *
   */
  Users: UserModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
