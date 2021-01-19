export function homeRoutes(fastify, opts, next){
    console.log(opts)
    fastify.get('/', (req, res) => {
        res.send('hey from home')
    })
    next()
}