const {Fastify, SchemaRouter} = require('./../build')

const server = Fastify.getInstance()

server.register(SchemaRouter.routerGet, {prefix: 'schema'})
server.register(SchemaRouter.routerPost, {prefix: 'schema'})
server.listen(8000)