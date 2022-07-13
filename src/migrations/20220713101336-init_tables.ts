"use strict";
import { Sequelize as TSequelize, QueryInterface } from "sequelize";
import { UsersTableName, UserModelAttributes } from "../models/users.model";

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: TSequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(UsersTableName, UserModelAttributes, {
        transaction,
        logging: console.log,
      });
      await transaction.commit();
    } catch (err) {
      console.error(err);
      await transaction.rollback();
    }
  },

  /**
   *
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   */
  async down(queryInterface: QueryInterface, Sequelize: TSequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.dropTable(UsersTableName, {
        transaction,
        logging: console.log,
      });
      await transaction.commit();
    } catch (err) {
      console.error(err);
      await transaction.rollback();
    }
  },
};
