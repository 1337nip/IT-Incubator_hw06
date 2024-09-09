import { MongoMemoryServer } from 'mongodb-memory-server';
import { connectToDb, userCollection } from '../src/db/mongo-db';
import request from 'supertest';
import {app} from '../src/app'
import { fillUsers } from './testData';


describe ('/users/', () => {

let mongod:MongoMemoryServer

    beforeAll(async() => {
        mongod = await MongoMemoryServer.create()
        const uri = mongod.getUri()
        await connectToDb(uri)

        await userCollection.deleteMany()
        await userCollection.insertMany(fillUsers)
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

        const jestResponse1 =await request(app)
        .post('/auth/login')
        .send({loginOrEmail: 'Bohr', password:'fpPznXf1UwAjhz1M9ai1'})
        .expect(200)

        expect(jestResponse1.body).toEqual({
            "accessToken": expect.any(String)
        })

        const jestResponse2 = await request(app)
        .post('/auth/login')
        .send({loginOrEmail: 'newphysics@test.com', password:'fpPznXf1UwAjhz1M9ai1'})
        .expect(200)

        expect(jestResponse2.body).toEqual({
            "accessToken": expect.any(String)
        })
    })

    it('auth/me does not return data without correct token', async() =>{
        await request(app)
        .get('/auth/me')
        .set({Authorization: 'Bearer thistokencannotbecorrect'})
        .expect(401)
    }) 
    
    it('auth/me returns correct viewModel with correct token', async()=>{
        const jestResponse = await request(app)
        .post('/auth/login')
        .send({loginOrEmail: 'Bohr', password:'fpPznXf1UwAjhz1M9ai1'})
        .expect(200)

        const token = jestResponse.body.accessToken

        const jestResponse2 = await request(app)
        .get('/auth/me')
        .set({Authorization: 'Bearer ' + token})
        .expect(200)

        expect(jestResponse2.body).toEqual({
            email: "newphysics@test.com",
            login:  "Bohr",
            userId: "2"
        })
    })

})