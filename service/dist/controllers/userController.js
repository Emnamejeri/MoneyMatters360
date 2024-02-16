"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var userBalance_1 = __importDefault(require("../models/userBalance"));
var userController = {
    // Get user balance by ID
    getUserBalanceById: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, userBalance, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userId = parseInt(req.params.id, 10);
                    return [4 /*yield*/, userBalance_1.default.findByPk(userId)];
                case 1:
                    userBalance = _a.sent();
                    if (!userBalance) {
                        return [2 /*return*/, res.status(404).json({ message: "User balance not found" })];
                    }
                    return [2 /*return*/, res.status(200).json(userBalance)];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error fetching user balance:", error_1);
                    return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    // Top up user's balance
    topUpBalance: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, _a, amount, currency, userBalance, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    userId = parseInt(req.params.id, 10);
                    _a = req.body, amount = _a.amount, currency = _a.currency;
                    return [4 /*yield*/, userBalance_1.default.findByPk(userId)];
                case 1:
                    userBalance = _b.sent();
                    if (!!userBalance) return [3 /*break*/, 3];
                    return [4 /*yield*/, userBalance_1.default.create({ user_id: userId })];
                case 2:
                    // If user balance doesn't exist, create a new one
                    userBalance = _b.sent();
                    _b.label = 3;
                case 3:
                    // Update user's balance for the specified currency
                    switch (currency.toLowerCase()) {
                        case "euro":
                            userBalance.euro_balance += amount;
                            break;
                        case "gbp":
                            userBalance.gbp_balance += amount;
                            break;
                        case "jpy":
                            userBalance.jpy_balance += amount;
                            break;
                        case "usd":
                            userBalance.usd_balance += amount;
                            break;
                        default:
                            return [2 /*return*/, res.status(400).json({ message: "Invalid currency" })];
                    }
                    // Save updated user balance
                    return [4 /*yield*/, userBalance.save()];
                case 4:
                    // Save updated user balance
                    _b.sent();
                    return [2 /*return*/, res.status(200).json(userBalance)];
                case 5:
                    error_2 = _b.sent();
                    console.error("Error topping up balance:", error_2);
                    return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
                case 6: return [2 /*return*/];
            }
        });
    }); },
    // Convert currency
    convertCurrency: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var userId, _a, fromCurrency, toCurrency, amount, userBalance, sourceBalance, convertedAmount, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    userId = parseInt(req.params.id, 10);
                    _a = req.body, fromCurrency = _a.fromCurrency, toCurrency = _a.toCurrency, amount = _a.amount;
                    return [4 /*yield*/, userBalance_1.default.findByPk(userId)];
                case 1:
                    userBalance = _b.sent();
                    if (!userBalance) {
                        return [2 /*return*/, res.status(404).json({ message: "User balance not found" })];
                    }
                    // Check if fromCurrency and toCurrency are valid
                    if (!isValidCurrency(fromCurrency) || !isValidCurrency(toCurrency)) {
                        return [2 /*return*/, res.status(400).json({ message: "Invalid currency" })];
                    }
                    sourceBalance = userBalance[fromCurrency.toLowerCase() + "_balance"];
                    if (sourceBalance < amount) {
                        return [2 /*return*/, res.status(400).json({ message: "Insufficient balance" })];
                    }
                    convertedAmount = amount * getExchangeRate(fromCurrency, toCurrency);
                    // Deduct the converted amount from the source currency balance
                    userBalance[fromCurrency.toLowerCase() + "_balance"] -= amount;
                    // Add the converted amount to the destination currency balance
                    userBalance[toCurrency.toLowerCase() + "_balance"] += convertedAmount;
                    // Save updated user balance
                    return [4 /*yield*/, userBalance.save()];
                case 2:
                    // Save updated user balance
                    _b.sent();
                    return [2 /*return*/, res.status(200).json({ convertedAmount: convertedAmount })];
                case 3:
                    error_3 = _b.sent();
                    console.error("Error converting currency:", error_3);
                    return [2 /*return*/, res.status(500).json({ message: "Internal server error" })];
                case 4: return [2 /*return*/];
            }
        });
    }); },
};
// Helper function to check if a currency is valid
function isValidCurrency(currency) {
    return ["euro", "gbp", "jpy", "usd"].includes(currency.toLowerCase());
}
// Helper function to get exchange rate
function getExchangeRate(fromCurrency, toCurrency) {
    var exchangeRates = {
        euro: { euro: 1, gbp: 0.85, jpy: 130, usd: 1.12 },
        gbp: { euro: 1.18, gbp: 1, jpy: 150, usd: 1.3 },
        jpy: { euro: 0.0077, gbp: 0.0067, jpy: 1, usd: 0.009 },
        usd: { euro: 0.89, gbp: 0.77, jpy: 111, usd: 1 },
    };
    return exchangeRates[fromCurrency.toLowerCase()][toCurrency.toLowerCase()];
}
exports.default = userController;
//# sourceMappingURL=userController.js.map