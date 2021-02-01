import fastify, {FastifyInstance} from 'fastify'
import bodyform from 'fastify-formbody'
import fastifySwagger from 'fastify-swagger'
import cors from 'fastify-cors'
import * as fs from 'fs'

class Server{
    private server: FastifyInstance
    public constructor(){
        this.server = fastify()
        this.server.register(bodyform)
        this.server.register(cors)
    }

    

    private registerSwagger()
    {

    }

    public getServer(): FastifyInstance{
        return this.server
    }

    public listen(port: number):void{
        this.server.listen(port, err => {
            if(err){
                console.log(err)
                process.exit(1)
            }
            console.log(`Listening on port ${port}`)
        })
    }
}