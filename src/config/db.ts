import { PoolOptions } from "sequelize";

const connectionPoolOptions: PoolOptions = {
  min: 0,
  max: 50,
  idle: 30000,
  acquire: 60000,
};

const development = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: console.log,
  pool: connectionPoolOptions,
};

const test = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: console.log,
  pool: connectionPoolOptions,
};

const production = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  pool: connectionPoolOptions,
};

const config = {
  development,
  test,
  production,
};

module.exports = config;
