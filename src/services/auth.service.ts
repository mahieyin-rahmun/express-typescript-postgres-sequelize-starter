import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "@config";
import DB from "@models/index";
import { CreateUserDto } from "@dtos/users.dto";
import { HttpException } from "@exceptions/HttpException";
import { DataStoredInToken, TokenData } from "@interfaces/auth.interface";
import { IUser } from "@interfaces/users.interface";
import { isEmpty } from "@utils/util";
import { EHttpStatusCodes } from "@/common";

class AuthService {
  public users = DB.Users;

  public async signup(userData: CreateUserDto): Promise<IUser> {
    if (isEmpty(userData))
      throw new HttpException(
        EHttpStatusCodes.BAD_REQUEST,
        "You're not userData",
      );

    const findUser: IUser = await this.users.findOne({
      where: { email: userData.email },
    });
    if (findUser)
      throw new HttpException(
        EHttpStatusCodes.CONFLICT,
        `You're email ${userData.email} already exists`,
      );

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: IUser = await this.users.create({
      ...userData,
      password: hashedPassword,
    });

    return createUserData;
  }

  public async login(
    userData: CreateUserDto,
  ): Promise<{ cookie: string; findUser: IUser }> {
    if (isEmpty(userData))
      throw new HttpException(
        EHttpStatusCodes.BAD_REQUEST,
        "You're not userData",
      );

    const findUser: IUser = await this.users.findOne({
      where: { email: userData.email },
    });
    if (!findUser)
      throw new HttpException(
        EHttpStatusCodes.CONFLICT,
        `Your email ${userData.email} not found`,
      );

    const isPasswordMatching: boolean = await compare(
      userData.password,
      findUser.password,
    );
    if (!isPasswordMatching)
      throw new HttpException(
        EHttpStatusCodes.CONFLICT,
        "Your password not matching",
      );

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: IUser): Promise<IUser> {
    if (isEmpty(userData))
      throw new HttpException(
        EHttpStatusCodes.BAD_REQUEST,
        "You're not userData",
      );

    const findUser: IUser = await this.users.findOne({
      where: { email: userData.email, password: userData.password },
    });
    if (!findUser)
      throw new HttpException(EHttpStatusCodes.CONFLICT, "You're not user");

    return findUser;
  }

  public createToken(user: IUser): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return {
      expiresIn,
      token: sign(dataStoredInToken, secretKey, { expiresIn }),
    };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
