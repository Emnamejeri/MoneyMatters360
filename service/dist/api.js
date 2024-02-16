"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.trpcRouter = void 0;
var server_1 = require("@trpc/server");
var zod_1 = require("zod");
// Define request and response types using Zod schemas
var schemas = {
    // Request schema for user registration
    UserRegistrationRequest: zod_1.z.object({
        username: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(6),
    }),
    // Response schema for user registration
    UserRegistrationResponse: zod_1.z.object({
        success: zod_1.z.boolean(),
        message: zod_1.z.string(),
    }),
    // Request schema for user login
    UserLoginRequest: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
    }),
    // Response schema for user login
    UserLoginResponse: zod_1.z.object({
        success: zod_1.z.boolean(),
        message: zod_1.z.string(),
        token: zod_1.z.string(),
    }),
    // Request schema for fetching user profile
    UserProfileRequest: zod_1.z.object({
        userId: zod_1.z.string(),
    }),
    // Response schema for user profile
    UserProfileResponse: zod_1.z.object({
        username: zod_1.z.string(),
        email: zod_1.z.string().email(),
        // Additional profile fields...
    }),
};
// Create tRPC router
exports.trpcRouter = (0, server_1.createRouter)()
    // Define API endpoints
    .query("getUserProfile", {
    input: schemas.UserProfileRequest,
    resolve: function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var userProfile;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, getUserProfile(input.userId)];
                    case 1:
                        userProfile = _b.sent();
                        return [2 /*return*/, __assign({}, userProfile)];
                }
            });
        });
    },
})
    .mutation("registerUser", {
    input: schemas.UserRegistrationRequest,
    resolve: function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var registrationResult;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, registerUser(input)];
                    case 1:
                        registrationResult = _b.sent();
                        return [2 /*return*/, __assign({}, registrationResult)];
                }
            });
        });
    },
})
    .mutation("loginUser", {
    input: schemas.UserLoginRequest,
    resolve: function (_a) {
        var input = _a.input;
        return __awaiter(void 0, void 0, void 0, function () {
            var loginResult;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, loginUser(input)];
                    case 1:
                        loginResult = _b.sent();
                        return [2 /*return*/, __assign({}, loginResult)];
                }
            });
        });
    },
});
// Example functions to implement the actual logic
function getUserProfile(userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // Fetch user profile from the database
            return [2 /*return*/, {
                    username: "JohnDoe",
                    email: "john@example.com",
                    // Additional profile fields...
                }];
        });
    });
}
function registerUser(userData) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // Register the user and return registration result
            return [2 /*return*/, { success: true, message: "User registered successfully" }];
        });
    });
}
function loginUser(loginData) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // Authenticate user login and return login result with token
            return [2 /*return*/, { success: true, message: "Login successful", token: "JWT_TOKEN" }];
        });
    });
}
//# sourceMappingURL=api.js.map