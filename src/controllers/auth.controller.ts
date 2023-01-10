import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "@dtos/users.dto";
import { IUser } from "@interfaces/users.interface";
import { RequestWithUser } from "@interfaces/auth.interface";
import AuthService from "@services/auth.service";
import { EHttpStatusCodes } from "@/common";
import { inject, injectable } from "inversify";
import { DEPENDENCY_TYPES } from "@/dependency/types";
import { controller, httpPost } from "inversify-express-utils";

@controller("/auth")
class AuthController {
  private authService: AuthService;

  public constructor(
    @inject(DEPENDENCY_TYPES.AuthService) authService: AuthService,
  ) {
    this.authService = authService;
  }

  @httpPost("/signup")
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: IUser = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: "signup" });
    } catch (error) {
      next(error);
    }
  }

  @httpPost("/login")
  public async logIn(req: Request, res: Response, next: NextFunction) {
    try {
      const userData: CreateUserDto = req.body;
      const { cookie, findUser } = await this.authService.login(userData);

      res.setHeader("Set-Cookie", [cookie]);
      res
        .status(EHttpStatusCodes.OK)
        .json({ data: findUser, message: "login" });
    } catch (error) {
      next(error);
    }
  }

  @httpPost("/logout")
  public async logOut(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const userData: IUser = req.user;
      const logOutUserData: IUser = await this.authService.logout(userData);

      res.setHeader("Set-Cookie", ["Authorization=; Max-age=0"]);
      res
        .status(EHttpStatusCodes.OK)
        .json({ data: logOutUserData, message: "logout" });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
