import { MongoMemoryServer } from 'mongodb-memory-server';
import { connectToDb, userCollection } from '../src/db/mongo-db';
import request from 'supertest';
import {app} from '../src/app'
import { userInputModel} from '../src/features/users/models/userModels';
import { fillUsers } from './testData';
import { ObjectId } from 'mongodb';


describe ('/users/', () => {

let mongod:MongoMemoryServer

    beforeAll(async() => {
        mongod = await MongoMemoryServer.create()
        const uri = mongod.getUri()
        await connectToDb(uri)

        await userCollection.deleteMany()
        console.log('Drop successful')
    })

    afterAll(async () => {
        await mongod.stop();
    })

    it('create user with authorizaton: check response, check creation in DB', async() => {
        const userBody:userInputModel = {
            login: 'Badabam',
            password: 'qwerty12345',
            email: 'badabam@aol.com'
        }
        
        let jestResponse = await request(app)
        .post('/users')
        .set({'Authorization': 'Basic YWRtaW46cXdlcnR5' })
        .send(userBody)
        .expect(201)

        expect(jestResponse.body).toEqual({
            login: 'Badabam',
            email: 'badabam@aol.com',
            id:expect.any(String),
            createdAt: expect.any(String),
        })

        const jestResponse2 = await request(app)
            .get('/users')
            .expect(200)

        expect(jestResponse2.body).toEqual({
            "pagesCount": 1,
            "page": 1,
            "pageSize": 10,
            "totalCount": 1,
            "items": [
              {
                id: jestResponse.body.id,
                login: 'Badabam',
                email: 'badabam@aol.com',
                createdAt: expect.any(String)
              }]
          }) 
    })

    it('do not create user without authorization: check creation in DB', async() => {
       
        const userBody:userInputModel = {
            login: 'Badabum',
            password: 'qwerty12345',
            email: 'badabum@aol.com'
        }

        await request(app)
        .post('/users')
        .set({'Authorization': 'Basic YWRtaW4' })
        .send(userBody)
        .expect(401)

        const jestResponse = await request(app)
            .get('/users')
            .expect(200)

        expect(jestResponse.body).toEqual({
            "pagesCount": 1,
            "page": 1,
            "pageSize": 10,
            "totalCount": 1,
            "items": [
              {
                id: expect.any(String),
                login: 'Badabam',
                email: 'badabam@aol.com',
                createdAt: expect.any(String)
              }]
          }) 
    })

    it('do no create user with existing login/email: check error response, check creation in DB', async() =>{
        const userBody1:userInputModel = {
            login: 'Badabam',
            password: 'qwerty12345',
            email: 'badabam@aol.com'
        }

        const userBody2:userInputModel = {
            login: 'Badabam999',
            password: 'qwerty12345',
            email: 'badabam@aol.com'
        }

        const jestResponse = await request(app)
        .post('/users')
        .set({'Authorization': 'Basic YWRtaW46cXdlcnR5' })
        .send(userBody1)
        .expect(400)

        expect(jestResponse.body).toEqual({
            errorsMessages: [{field: 'login', message: 'this login already exists'}]
        })

        const jestResponse2 = await request(app)
        .post('/users')
        .set({'Authorization': 'Basic YWRtaW46cXdlcnR5' })
        .send(userBody2)
        .expect(400)

        expect(jestResponse2.body).toEqual({
            errorsMessages: [{field: 'email', message: 'this email already exists'}]
        })

        const jestResponse3 = await request(app)
        .get('/users')
        .expect(200)

    expect(jestResponse3.body).toEqual({
        "pagesCount": 1,
        "page": 1,
        "pageSize": 10,
        "totalCount": 1,
        "items": [
          {
            id: expect.any(String),
            login: 'Badabam',
            email: 'badabam@aol.com',
            createdAt: expect.any(String)
          }]
      }) 
    })

    it('do not create user with invalid body input: check validation errors, check creation in DB', async() => {
        const userBody1:any = {
            login: null,
            password: null,
            email: null
        }

        const userBody2:any = {
            login: 123435,
            password: 55443322,
            email: 6546456
        }

        const userBody3:any = {
            login: 'Boss-werewolf2024',
            password: 'abc',
            email: 'usergmail.com'
        }

        const userBody4:any = {
            login: 'Boss#1',
            password: 'qwertyqwerty34235234adsfasdf',
            email: 'user@gmail.com'
        }


        const jestResponse1 = await request(app)
        .post('/users')
        .set({'Authorization': 'Basic YWRtaW46cXdlcnR5' })
        .send(userBody1)
        .expect(400)

        expect(jestResponse1.body).toEqual ({
            errorsMessages: [
                {
                message: 'Login required',
                field: 'login'
            },

            {
                message: 'Password required',
                field: 'password'
            },

            {
                message: 'Email required',
                field: 'email'
            }]
        })

        const jestResponse2 = await request(app)
        .post('/users')
        .set({'Authorization': 'Basic YWRtaW46cXdlcnR5' })
        .send(userBody2)
        .expect(400)
    
        expect(jestResponse2.body).toEqual ({
            errorsMessages: [
                {
                message: 'Must be a string',
                field: 'login'
            },

            {
                message:'Must be a string',
                field: 'password'
            },

            {
                message: 'Must be a string',
                field: 'email'
            }]
        })

        const jestResponse3 = await request(app)
        .post('/users')
        .set({'Authorization': 'Basic YWRtaW46cXdlcnR5' })
        .send(userBody3)
        .expect(400)
    
        expect(jestResponse3.body).toEqual ({
            errorsMessages: [
                {
                message: 'Must be 3 to 10 characters',
                field: 'login'
            },

            {
                message:'Must be 6 to 20 characters',
                field: 'password'
            },

            {
                message:'Must be an email: example@example.com',
                field: 'email'
            }]
        })

        const jestResponse4 = await request(app)
        .post('/users')
        .set({'Authorization': 'Basic YWRtaW46cXdlcnR5' })
        .send(userBody4)
        .expect(400)
    
        expect(jestResponse4.body).toEqual ({
            errorsMessages: [
                {
                message: 'Symbols are not allowed',
                field: 'login'
            },
                {
                message:'Must be 6 to 20 characters',
                field: 'password'
            }]
        })

        const jestResponse5 = await request(app)
        .get('/users')
        .expect(200)

        expect(jestResponse5.body).toEqual({
            "pagesCount": 1,
            "page": 1,
            "pageSize": 10,
            "totalCount": 1,
            "items": [
            {
                id: expect.any(String),
                login: 'Badabam',
                email: 'badabam@aol.com',
                createdAt: expect.any(String)
            }]
        })
    })

    it('should delete user by id: check authorization, check deletion in DB', async() =>{
        userCollection.deleteMany()
        userCollection.insertOne({_id:new ObjectId( '65006408082dbe6d9f6206f1'),
            id: '1',
            login: 'Badabam',
            email: 'badabam@aol.com',
            passwordHash: 'do not need for test',
            createdAt: "2024-09-08T18:24:21.794Z"
        })
        await request(app)
        .delete('/users/1')
        .expect(401)

        const jestResponse = await request(app)
        .get('/users')
        .expect(200)

        expect(jestResponse.body).toEqual({
            "pagesCount": 1,
            "page": 1,
            "pageSize": 10,
            "totalCount": 1,
            "items": [
            {
                id: expect.any(String),
                login: 'Badabam',
                email: 'badabam@aol.com',
                createdAt: expect.any(String)
            }]
        })

        await request(app)
        .delete('/users/2')
        .set({'Authorization': 'Basic YWRtaW46cXdlcnR5' })
        .expect(404)

        await request(app)
        .delete('/users/1')
        .set({'Authorization': 'Basic YWRtaW46cXdlcnR5' })
        .expect(204)

        const jestResponse2 = await request(app)
        .get('/users')
        .expect(200)

        expect(jestResponse2.body).toEqual({
            "pagesCount": 0,
            "page": 1,
            "pageSize": 10,
            "totalCount": 0,
            "items": []
        })
    })


    it('GET /users without search, default pagination ', async() =>  {
        userCollection.deleteMany()
        userCollection.insertMany(fillUsers)
        const jestResponse = await request(app)
        .get('/users')
        .expect(200)

        const check = await userCollection
        .find({}, {projection: {_id:0, password:0, passwordHash:0}})
        .sort('createdAt', 'desc')
        .limit(10)
        .toArray()

        expect(jestResponse.body).toEqual({
            "pagesCount": 2,
            "page": 1,
            "pageSize": 10,
            "totalCount": 13,
            "items": check
        })
     })

     it('GET /users without search, with query pagination ', async() =>  {
        
        const jestResponse = await request(app)
        .get('/users')
        .query({sortBy: 'login', sortDirection: 'asc', pageSize:'3', pageNumber:'2'})
        .expect(200)

        const check = await userCollection
        .find({}, {projection: {_id:0, password:0, passwordHash:0}})
        .sort('login', 'asc')
        .skip(3)
        .limit(3)
        .toArray()

        expect(jestResponse.body).toEqual({
            "pagesCount": 5,
            "page": 2,
            "pageSize": 3,
            "totalCount": 13,
            "items": check
        })
    })

    it('GET /users with search, with query pagination ', async() =>  {
         
        const jestResponse = await request(app)
        .get('/users')
        .query({sortBy: 'email', sortDirection: 'asc', pageSize:'5', pageNumber:'1', searchLoginTerm: 'X', searchEmailTerm:'k'})
        .expect(200)

        const check = await userCollection
        .find({$or:[{login:RegExp ('X','i')}, {email: RegExp ('k','i')}]}, {projection: {_id:0, password:0, passwordHash:0}})
        .sort('email', 'asc')
        .skip(0)
        .limit(5)
        .toArray()
        console.log(check)

        expect(jestResponse.body).toEqual({
            "pagesCount": 1,
            "page": 1,
            "pageSize": 5,
            "totalCount": 2,
            "items": check
        })
    })
})