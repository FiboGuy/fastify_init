export function garageRoutes(fastify, opts, next){
    fastify.addHook('onRequest', (request, reply, next) => {
        console.log('garage 1')
        next()
      })
    fastify.get('/', (req, res) => {
        res.send('hey from garage')
    })
    next()
}

export function garageRoutes2(fastify, opts, next){
    fastify.addHook('onRequest', (request, reply, next) => {
        console.log('garage 2')
        next()
      })
    fastify.get('/2', (req, res) => {
        res.send('hey from garage 2')
    })
    next()
}