import "reflect-metadata";
import { myContainer } from "@/dependency/inversify.config";
import App from "@/app";
import validateEnv from "@utils/validateEnv";
import { getRouteInfo, InversifyExpressServer } from "inversify-express-utils";

validateEnv();

let server = new InversifyExpressServer(myContainer);
const app = new App(server);
app.listen();
