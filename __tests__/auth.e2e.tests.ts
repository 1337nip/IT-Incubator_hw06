import { MongoMemoryServer } from 'mongodb-memory-server';
import { connectToDb, userCollection } from '../src/db/mongo-db';
import request from 'supertest';
import {app} from '../src/app'
import { fill } from './testData';


describe ('/users/', () => {

let mongod:MongoMemoryServer

    beforeAll(async() => {
        mongod = await MongoMemoryServer.create()
        const uri = mongod.getUri()
        await connectToDb(uri)

        await userCollection.deleteMany()
        await userCollection.insertMany(fill)
        console.log('Refresh succesful')
    })

    afterAll(async () => {
        await mongod.stop();
    })

    it('auth login: check body input, check credentials', async() => {
       
        const jestResponse = await request(app)
        .post('/auth/login')
        .send({loginOrEmail: null, password:56546})
        .expect(400)

        expect(jestResponse.body).toEqual({
                errorsMessages: [
                  {
                    "message": expect.any(String),
                    "field": "loginOrEmail"
                     },
                  {
                    "message": expect.any(String),
                    "field": "password"
                    },
                ]
        })

        await request(app)
        .post('/auth/login')
        .send({loginOrEmail: 'Einstein', password:'56546'})
        .expect(401)

        await request(app)
        .post('/auth/login')
        .send({loginOrEmail: 'Bohr', password:'fpPznXf1UwAjhz1M9ai1'})
        .expect(204)

        await request(app)
        .post('/auth/login')
        .send({loginOrEmail: 'newphysics@test.com', password:'fpPznXf1UwAjhz1M9ai1'})
        .expect(204)
    })

})