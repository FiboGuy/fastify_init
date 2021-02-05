"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const fastify_1 = __importDefault(require("fastify"));
const fastify_formbody_1 = __importDefault(require("fastify-formbody"));
const fastify_cors_1 = __importDefault(require("fastify-cors"));
class Server {
    constructor() {
        this.server = fastify_1.default();
        this.server.register(fastify_formbody_1.default);
        this.server.register(fastify_cors_1.default);
    }
    registerSwagger() { }
    getServer() {
        return this.server;
    }
    listen(port) {
        this.server.listen(port, (err) => {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            console.log(`Listening on port ${port}`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map