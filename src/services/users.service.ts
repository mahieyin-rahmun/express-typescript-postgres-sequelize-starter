import { hash } from "bcrypt";
import DB from "@models/index";
import { CreateUserDto } from "@dtos/users.dto";
import { HttpException } from "@exceptions/HttpException";
import { IUser } from "@interfaces/users.interface";
import { isEmpty } from "@utils/util";
import { EHttpStatusCodes } from "@/common";

class UserService {
  public users = DB.Users;

  public async findAllUser(): Promise<IUser[]> {
    const allUser: IUser[] = await this.users.findAll();
    return allUser;
  }

  public async findUserById(userId: number): Promise<IUser> {
    if (isEmpty(userId))
      throw new HttpException(
        EHttpStatusCodes.BAD_REQUEST,
        "You're not userId",
      );

    const findUser: IUser = await this.users.findByPk(userId);
    if (!findUser)
      throw new HttpException(EHttpStatusCodes.CONFLICT, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<IUser> {
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

  public async updateUser(
    userId: number,
    userData: CreateUserDto,
  ): Promise<IUser> {
    if (isEmpty(userData))
      throw new HttpException(
        EHttpStatusCodes.BAD_REQUEST,
        "You're not userData",
      );

    const findUser: IUser = await this.users.findByPk(userId);
    if (!findUser)
      throw new HttpException(EHttpStatusCodes.CONFLICT, "You're not user");

    const hashedPassword = await hash(userData.password, 10);
    await this.users.update(
      { ...userData, password: hashedPassword },
      { where: { id: userId } },
    );

    const updateUser: IUser = await this.users.findByPk(userId);
    return updateUser;
  }

  public async deleteUser(userId: number): Promise<IUser> {
    if (isEmpty(userId))
      throw new HttpException(
        EHttpStatusCodes.BAD_REQUEST,
        "You're not userId",
      );

    const findUser: IUser = await this.users.findByPk(userId);
    if (!findUser)
      throw new HttpException(EHttpStatusCodes.CONFLICT, "You're not user");

    await this.users.destroy({ where: { id: userId } });

    return findUser;
  }
}

export default UserService;
