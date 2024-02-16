import { Model, DataTypes } from "sequelize";
import sequelize from "../utils/database";

interface UserBalanceInstance extends Model {
  user_id: number;
  euro_balance: number;
  gbp_balance: number;
  jpy_balance: number;
  usd_balance: number;
  [key: string]: any;
}

class UserBalance extends Model<UserBalanceInstance> {
  public user_id!: number;
  public euro_balance!: number;
  public gbp_balance!: number;
  public jpy_balance!: number;
  public usd_balance!: number;
}

UserBalance.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    euro_balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    gbp_balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    jpy_balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    usd_balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "UserBalance",
    tableName: "user_balances",
  }
);

export default UserBalance;
