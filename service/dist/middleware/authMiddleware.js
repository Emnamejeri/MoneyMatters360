"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authMiddleware = {
    // Middleware function to verify JWT token
    verifyToken: function (req, res, next) {
        var _a;
        var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        try {
            var decoded = jsonwebtoken_1.default.verify(token, "your_secret_key"); // Replace 'your_secret_key' with your actual secret key
            // Add the decoded user information to the request object
            req.user = decoded;
            // Proceed to the next middleware or route handler
            next();
        }
        catch (error) {
            console.error("Token verification failed:", error);
            return res.status(403).json({ message: "Failed to authenticate token" });
        }
    },
};
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map