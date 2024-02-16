"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authRoutes_1 = __importDefault(require("./authRoutes"));
var userRoutes_1 = __importDefault(require("./userRoutes"));
var router = express_1.default.Router();
// Authentication routes
router.use("/auth", authRoutes_1.default);
// User management routes
router.use("/users", userRoutes_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map