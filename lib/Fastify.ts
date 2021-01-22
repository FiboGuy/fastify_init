import fastify, { FastifyInstance, FastifyPluginCallback, RegisterOptions } from 'fastify'
import formbody from 'fastify-formbody'

export class Fastify{
    private server: FastifyInstance
    private static instance: Fastify
    private constructor(){
        this.server = fastify()
        this.register(formbody)
    }

    public static getInstance(): Fastify{
        if(!this.instance){
            this.instance = new this()
        }
        return this.instance
    }

    public register(func: FastifyPluginCallback, options: RegisterOptions = {}){
        this.server.register(func, options)
    }

    public listen(port: number): void{
        this.server.listen(port, err => {
            if(err){
                console.log(err)
                process.exit(1)
            }
            console.log(`Listening on port ${port}`)
        })
    }
}

