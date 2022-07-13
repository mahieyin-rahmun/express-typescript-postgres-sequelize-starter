import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "@dtos/users.dto";
import { IUser } from "@interfaces/users.interface";
import userService from "@services/users.service";
import { EHttpStatusCodes } from "@/common";

class UsersController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: IUser[] = await this.userService.findAllUser();

      res
        .status(EHttpStatusCodes.OK)
        .json({ data: findAllUsersData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = Number(req.params.id);
      const findOneUserData: IUser = await this.userService.findUserById(
        userId,
      );

      res
        .status(EHttpStatusCodes.OK)
        .json({ data: findOneUserData, message: "findOne" });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userData: CreateUserDto = req.body;
      const createUserData: IUser = await this.userService.createUser(userData);

      res.status(201).json({ data: createUserData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = Number(req.params.id);
      const userData: CreateUserDto = req.body;
      const updateUserData: IUser = await this.userService.updateUser(
        userId,
        userData,
      );

      res
        .status(EHttpStatusCodes.OK)
        .json({ data: updateUserData, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData: IUser = await this.userService.deleteUser(userId);

      res
        .status(EHttpStatusCodes.OK)
        .json({ data: deleteUserData, message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
