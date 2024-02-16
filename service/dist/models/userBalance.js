"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//userBalance.ts 
var sequelize_1 = require("sequelize");
var database_1 = __importDefault(require("../utils/database")); // Import your Sequelize instance
var UserBalance = /** @class */ (function (_super) {
    __extends(UserBalance, _super);
    function UserBalance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserBalance;
}(sequelize_1.Model));
UserBalance.init({
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    euro_balance: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
    },
    gbp_balance: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
    },
    jpy_balance: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
    },
    usd_balance: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
    },
}, {
    sequelize: database_1.default,
    modelName: "UserBalance",
    tableName: "user_balances",
});
exports.default = UserBalance;
//# sourceMappingURL=userBalance.js.map