import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from "@config";
import DB from "@models/index";
import errorMiddleware from "@middlewares/error.middleware";
import { logger, stream } from "@utils/logger";
import { InversifyExpressServer } from "inversify-express-utils";

class App {
  public server: InversifyExpressServer;
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(server: InversifyExpressServer) {
    this.server = server;
    this.env = NODE_ENV || "development";
    this.port = PORT || 3000;

    this.connectToDatabase();

    this.server.setConfig((app: express.Application) => {
      this.initializeMiddlewares(app);
      this.initializeSwagger(app);
    });

    this.server.setErrorConfig((app: express.Application) => {
      this.initializeErrorHandling(app);
    });

    this.app = this.server.build();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.server;
  }

  private connectToDatabase() {
    DB.sequelize
      .authenticate()
      .then(() => logger.info("Database authenticated successfully"))
      .catch((err: Error) => logger.error(err.message));
  }

  private initializeMiddlewares(app: express.Application) {
    app.use(morgan(LOG_FORMAT, { stream }));
    app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    app.use(hpp());
    app.use(helmet());
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
  }

  private initializeSwagger(app: express.Application) {
    const options = {
      swaggerDefinition: {
        info: {
          title: "REST API",
          version: "1.0.0",
          description: "Example docs",
        },
      },
      apis: ["swagger.yaml"],
    };

    const specs = swaggerJSDoc(options);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling(app: express.Application) {
    app.use(errorMiddleware);
  }
}

export default App;
