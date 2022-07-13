import { Request } from "express";
import { IUser } from "@interfaces/users.interface";

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: IUser;
}
