import { FastifyInstance } from "fastify";
export declare class Server {
    private server;
    constructor();
    private registerSwagger;
    getServer(): FastifyInstance;
    listen(port: number): void;
}
