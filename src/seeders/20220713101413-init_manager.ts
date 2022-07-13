"use strict";
import { Sequelize as TSequelize, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: TSequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      /**
       * Add seed commands here.
       *
       * Example:
       * await queryInterface.bulkInsert('People', [{
       *   name: 'John Doe',
       *   isBetaMember: false
       * }], {});
       */
      await transaction.commit();
    } catch (err) {
      console.error(err);
      await transaction.rollback();
    }
  },

  async down(queryInterface: QueryInterface, Sequelize: TSequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      /**
       * Add commands to revert seed here.
       *
       * Example:
       * await queryInterface.bulkDelete('People', null, {});
       */
      await transaction.commit();
    } catch (err) {
      console.error(err);
      await transaction.rollback();
    }
  },
};
