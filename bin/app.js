const fastify = require('fastify')
const formbody = require('fastify-formbody')
const {SchemaRoutes} = require('./../build')

const server = fastify()
server.register(require('fastify-cors'))
server.register(formbody)


server.register(SchemaRoutes.routerGet, {prefix:''})

server.register(require('fastify-swagger'), {
    routePrefix: '/documentation',
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
      host: 'localhost:8000'
    },
    exposeRoute: true
})


server.register(SchemaRoutes.routerPost, {prefix:''})


server.listen(8000, err => {
    if(err){
        console.log(err)
        process.exit(1)
    }
    console.log(`Listening on port 8000`)
})

module.exports = server