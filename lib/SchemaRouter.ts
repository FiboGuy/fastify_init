export class SchemaRouter{
    public static routerGet(fastify, opts, next){
        fastify.addHook('onRequest', (request, reply, next) => {
            console.log('schema get')
            next()
            })
        fastify.route({
            method: 'GET',
            url: '/',
            schema: {
                querystring: {
                    properties: {
                        name: {type: 'string'},
                        lala: {
                            type: 'array',
                            maxItems: 3,
                            items: { type: 'integer'}
                        },
                        code: {
                            type: 'string',
                            pattern: "^\\d{4}$"  
                        }
                    },
                    required: ['name', 'code']
                },
            },
            handler: (req, res) => {
                console.log(req.query)
                res.send('hey from schema get')
            }
        })
        next()
    }

    public static routerPost(fastify, opts, next){
        fastify.addHook('onRequest', (request, reply, next) => {
            console.log('schema post')
            next()
          })
          fastify.route({
            method: 'POST',
            url: '/',
            schema: {
                body: {
                    properties: {
                        name: {
                            type: 'string'
                        },
                        code: {
                            oneOf: [
                                { type: 'string', maxLength: 5 },
                                { type: 'number', minimum: 4 }
                              ]
                        }
                    },
                    required: ['name', 'code']        
                },
            },
            handler: (req, res) => {
                console.log(req.body)
                res.send('hey from schema post')
            }
        })
        next()
    }
}