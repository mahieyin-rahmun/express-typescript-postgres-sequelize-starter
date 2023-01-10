#!/bin/bash

yarn build
yarn migrate:dev
yarn seed:dev
yarn run:dev