import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/database";

class User extends Model {
  public id!: number;
  public fullname!: string;
  public email!: string;
  public username!: string;
  public address!: string;
  public dob!: Date;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "userdetails",
  }
);

export default User;
