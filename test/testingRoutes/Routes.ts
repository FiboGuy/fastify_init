export class Routes{
    public static routerGet = (fastify, opts, next): void => {
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
                }
            },
            handler: (req, res) => {
                // console.log(req.query)
                res.send({data: 'hey from schema get'})
            }
        })
        next()
    }

    public static routerPost = (fastify, opts, next): void => {
        fastify.addHook('onRequest', (request, reply, next) => {
            console.log('schema post')
            next()
            })
            fastify.route({
                method: 'POST',
                url: '/',
                type: 'object',
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
                            },
                            lala: {type: 'number'}
                        },
                        required: ['name', 'code']        
                    },
                },
                handler: (req, res) => {
                    res.send({data: 'hey from schema post'})
                }
        })
        next()
    }
}