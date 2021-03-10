import axios from 'axios'
import {assert} from 'chai'
import {Server} from './../lib'
import {Routes} from './testingRoutes'

const server = new Server()
server.register(Routes.routerGet, {prefix: ''})
server.registerSwagger()
server.register(Routes.routerPost, {prefix: ''})
server.listen()

after(() => {
    server.getServer().close()
})

describe('Testing response get', () => {
    it('Testing a get route 400', async () => {
        let result: any
        try{
            result = await axios.get('http://localhost:8000')
        }catch(err){
            result = err
        }
        const data = result.response.data
        assert.equal(data.statusCode, 400)
        assert.equal(data.message, "querystring should have required property 'name'")
    })

    it('Testing a get route 200', async () => {
        let result: any
        try{
            result = await axios.get('http://localhost:8000?name=dsds&code=1234')
        }catch(err){
            result = err
        }
        const data = result.data
        assert.typeOf(data, 'object')
        assert.equal(data.data, 'hey from schema get')
    })
})


describe('Testing response get', () => {
    it('Testing a post route 400', async () => {
        let result: any
        try{
            result = await axios.post('http://localhost:8000', {})
        }catch(err){
            result = err
        }
        const data = result.response.data
        assert.equal(data.statusCode, 400)
        assert.equal(data.message, "body should have required property 'name'")
    })

    it('Testing a post route 200', async () => {
        let result: any
        try{
            result = await axios.post('http://localhost:8000', {name: 'lolo', code: 123214})
        }catch(err){
            result = err
        }
        const data = result.data
        assert.typeOf(data, 'object')
        assert.equal(data.data, 'hey from schema post')
    })
})

describe('Testing swagger documentation works', () => {
    it('End point documentation works', async () => {
        let result: any
        try{
            result = await axios.get('http://localhost:8000/documentation')
        }catch(err){
            result = err
        }
        assert.typeOf(result.data, 'string')
    })
})
