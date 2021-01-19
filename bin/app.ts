import fastify, { FastifyInstance } from 'fastify'
import {homeRoutes, garageRoutes, garageRoutes2} from './../build'

const server: FastifyInstance = fastify()

server.get('/', (req,res) => {
    res.send('hey25')
})

server.register(homeRoutes, {prefix: '/home'})
server.register(garageRoutes, {prefix: '/garage'})
server.register(garageRoutes2, {prefix: '/garage'})

server.listen(8000, (err, address): void => {
    if (err){
        console.log(err)
        process.exit(1)
    }
    console.log('Listening on port 8000')
})