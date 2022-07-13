# Express + TypeScript + Sequelize Starter Template (with Migrations)

This repository contains a starter template using Express, TypeScript and
Sequelize ORM based on [this repository](https://github.com/ljlm0402/typescript-express-starter).
It also supports migrations, albeit in a bit of a hacky way.

## Naming convention for environment variables files

Apart from the `.env.example` file, the `src/config/index.ts` file expects one of
the following three files (based on the value of `NODE_ENV`):

- `.env.development.local`
- `.env.production.local`
- `.env.test.local`

Essentially, it follows `.env.${NODE_ENV}.local` format for the filenames.

## How to achieve migrations and seeding

Due to how `sequelize` is wired to work best with JavaScript and not TypeScript, some workarounds needs to be used for usage of migrations and seeding.

- `.sequelizerc` file at the project root points to the `dist` folder (i.e. after TypeScript code has been transpiled to JavaScript).
- So, the migration and seed commands will place the `${timestamp}_${migration_name}.js` and `${timestamp}_${seeder_name}.js` files in the `dist/migrations` and `dist/seeders` folders, respectively.
- You need to copy the `.js` files to the `src/migrations` or `src/seeders` folders.
- You need to change the extension from `.js` to `.ts`.
- You need to change the structure to a TS based migration or seed file. A template structure is given below:

```ts
"use strict";
import { Sequelize as TSequelize, QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: TSequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      /**
       * Add altering commands here.
       *
       * Example:
       * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
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
       * Add reverting commands here.
       *
       * Example:
       * await queryInterface.dropTable('users');
       */
      await transaction.commit();
    } catch (err) {
      console.error(err);
      await transaction.rollback();
    }
  },
};
```

- Now, when you finish writing your migrations and seed files and build the project, the `dist` folder will contain the JS version of the same, and hence `.sequelizerc` will be able to apply your migrations.

For convenience, the commands to generate migration or seed files are given below:

#### Creating migrations

```sh
npx sequelize-cli migration:generate --name "migration_name"
```

#### Creating seeders

```sh
npx sequelize-cli seed:create --name "seed_name"
```

## Formatting code

Before committing your code, You can run `yarn format` to properly format all files in the repository based on the settings defined in the `.prettierrc` file at the root of the repository.
