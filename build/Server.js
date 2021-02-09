"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const fastify_1 = __importDefault(require("fastify"));
const fastify_formbody_1 = __importDefault(require("fastify-formbody"));
const fastify_swagger_1 = __importDefault(require("fastify-swagger"));
const fastify_cors_1 = __importDefault(require("fastify-cors"));
const fs = __importStar(require("fs"));
const os_1 = require("os");
class Server {
    constructor() {
        this.params = {
            env: undefined,
            port: undefined
        };
        this.server = fastify_1.default();
        this.server.register(fastify_formbody_1.default);
        this.server.register(fastify_cors_1.default);
        this.getConfig();
    }
    registerSwagger(routePrefix = '/documentation', force = false) {
        this.server.register(fastify_swagger_1.default, {
            routePrefix,
            swagger: {
                info: {
                    title: 'Api documentation',
                    description: 'End point to test api',
                    version: '0.1.0'
                },
                externalDocs: {
                    url: 'https://swagger.io',
                    description: 'Find more info here'
                },
                host: `localhost:${this.params.port}`
            },
            exposeRoute: this.params.env === 'dev' || force
        });
    }
    register(func, opts = {}) {
        this.server.register(func, opts);
    }
    getConfig() {
        const configPath = `${os_1.homedir}/.monkey_config.json`;
        if (fs.existsSync(configPath)) {
            const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))['server'];
            if (config) {
                this.params = { port: config?.port, env: config?.env };
                return;
            }
        }
        console.log('No monkey_config json server encountered for fastify options');
        process.exit(1);
    }
    getServer() {
        return this.server;
    }
    listen() {
        this.server.listen(this.params.port, (err) => {
            if (err) {
                console.log('You probably haven\'t submitted server config params in monkey_json file');
                console.log(err);
                process.exit(1);
            }
            console.log(`Listening on port ${this.params.port}`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=Server.js.map