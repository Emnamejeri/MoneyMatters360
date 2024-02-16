"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("@trpc/server");
var api_1 = require("./api");
exports.default = (0, server_1.createNextApiHandler)({
    router: api_1.appRouter,
});
//# sourceMappingURL=server.js.map