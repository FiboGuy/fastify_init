import fastify, { FastifyInstance } from "fastify";
import bodyform from "fastify-formbody";
import fastifySwagger from "fastify-swagger";
import cors from "fastify-cors";
import * as fs from "fs";
import {homedir} from 'os'

interface params{
    env: string,
    port: 8000
}

export class Server{
    private server: FastifyInstance
    private params: params = {
            env: 'dev',
            port: 8000
    }

    public constructor(){
        this.server = fastify()
        this.server.register(bodyform)
        this.server.register(cors)
        this.getConfig()
    }

    public registerSwagger(routePrefix: string = '/documentation', force: boolean = false): void {
            this.server.register(fastifySwagger, {
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
            })
    }

    public register(func: (fastify: FastifyInstance, opts: Record<string, any>, next: (err?: Error) => void) => void, opts: Record<string, any> = {})
    {
        this.server.register(func, opts)
    }


    private getConfig(): void
    {
        const configPath = `${homedir}/.monkey_config.json`
        if(fs.existsSync(configPath)){
            const config: params = JSON.parse(fs.readFileSync(configPath, 'utf-8'))['server']
            this.params = {port: config.port, env: config.env}
        }
    }

    public getServer(): FastifyInstance {
        return this.server;
    }

    public listen(): void {
        this.server.listen(this.params.port, (err) => {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        console.log(`Listening on port ${this.params.port}`);
        });
    }
}
