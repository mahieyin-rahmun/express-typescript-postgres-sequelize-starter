import { EHttpStatusCodes } from "@/common";
import { NextFunction, Request, Response } from "express";

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendStatus(EHttpStatusCodes.OK);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
