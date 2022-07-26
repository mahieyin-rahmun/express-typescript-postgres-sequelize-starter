import {
  Sequelize,
  DataTypes,
  Model,
  Optional,
  ModelAttributes,
} from "sequelize";
import { IUser } from "@interfaces/users.interface";
import { ITimestamps } from "@interfaces/common.interface";
import bcrypt from "bcrypt";

export const UsersTableName = "Users";
export type UserCreationAttributes = Optional<IUser, "id">;

export class UserModel
  extends Model<IUser, UserCreationAttributes>
  implements IUser, ITimestamps
{
  public id: number;
  public email: string;
  public password: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const UserModelAttributes: ModelAttributes<
  UserModel,
  Optional<IUser, never>
> = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING(45),
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING(255),
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
};

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(UserModelAttributes, {
    tableName: UsersTableName,
    sequelize,
    hooks: {
      beforeCreate: (userInstance, _) => {
        userInstance.password = bcrypt.hashSync(userInstance.password, 8);
      },
    },
  });

  return UserModel;
}
