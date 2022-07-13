import { ITimestamps } from "./common.interface";

export interface IUser extends ITimestamps {
  id: number;
  email: string;
  password: string;
}
