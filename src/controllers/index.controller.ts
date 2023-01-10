import express from "express";
import { EHttpStatusCodes } from "@/common";
import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import { controller, httpGet } from "inversify-express-utils";

const middlewareA: express.Handler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("middlewareA");
  next();
};

const middlewareB: express.Handler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("middlewareB");
  next();
};

@controller("/", middlewareA)
class IndexController {
  @httpGet("/", middlewareA, middlewareB)
  public async index(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(EHttpStatusCodes.OK).json({
        message: "Hello World!",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default IndexController;
