import { FastifyInstance } from "fastify";
export declare class Server {
    private server;
    private params;
    constructor();
    registerSwagger(routePrefix?: string, force?: boolean): void;
    register(func: (fastify: FastifyInstance, opts: Record<string, any>, next: (err?: Error) => void) => void, opts?: Record<string, any>): void;
    private getConfig;
    getServer(): FastifyInstance;
    listen(): void;
}
