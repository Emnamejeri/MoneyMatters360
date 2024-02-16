"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userController_1 = __importDefault(require("../controllers/userController"));
var authMiddleware_1 = __importDefault(require("../middleware/authMiddleware")); // Import the authentication middleware
var router = express_1.default.Router();
// Define routes for user-related operations
// Example route that requires authentication
router.get("/user/:id", authMiddleware_1.default.verifyToken, userController_1.default.getUserById); // Get user details by ID
// Example route that requires authentication
router.put("/user/:id", authMiddleware_1.default.verifyToken, userController_1.default.updateUser); // Update user details
exports.default = router;
//# sourceMappingURL=userRoutes.js.map