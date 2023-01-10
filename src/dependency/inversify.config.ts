// file inversify.config.ts

import AuthController from "@/controllers/auth.controller";
import IndexController from "@/controllers/index.controller";
import AuthService from "@/services/auth.service";
import { Container } from "inversify";
import { DEPENDENCY_TYPES } from "./types";

const myContainer = new Container();
myContainer
  .bind<AuthController>(DEPENDENCY_TYPES.AuthController)
  .to(AuthController);
myContainer.bind<AuthService>(DEPENDENCY_TYPES.AuthService).to(AuthService);
myContainer
  .bind<IndexController>(DEPENDENCY_TYPES.IndexController)
  .to(IndexController);

export { myContainer };
