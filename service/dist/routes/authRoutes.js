"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authControllers_1 = __importDefault(require("../controllers/authControllers"));
var router = express_1.default.Router();
// Define routes for authentication-related operations
// Route for user registration (no authentication required)
router.post("/register", authControllers_1.default.register);
// Route for user login (no authentication required)
router.post("/login", authControllers_1.default.login);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map