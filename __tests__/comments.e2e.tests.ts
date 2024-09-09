import { MongoMemoryServer } from 'mongodb-memory-server';
import { connectToDb, commentCollection, userCollection, postsCollection } from '../src/db/mongo-db';
import request from 'supertest';
import {app} from '../src/app'
import { fillUsers, fillPosts } from './testData';


describe ('/comments/', () => {
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyIiwiaWF0IjoxNzI1ODk1Njg4LCJleHAiOjE3MjY3NTk2ODh9.iBTlfgm5llxKCjVt8NoEPOuskmVu1znTok4_aR6Nc3o'

let mongod:MongoMemoryServer

    beforeAll(async() => {
        mongod = await MongoMemoryServer.create()
        const uri = mongod.getUri()
        await connectToDb(uri)

        await userCollection.deleteMany()
        await userCollection.insertMany(fillUsers)
        await postsCollection.deleteMany()
        await postsCollection.insertMany(fillPosts)
        await commentCollection.deleteMany()
        console.log('Refresh succesful')
    })

    afterAll(async () => {
        await mongod.stop();
    })

    it('do not create comment without valid token', async() => {
        await request(app)
        .post('/posts/1/comments')
        .set({Authorization: 'Bearer someinvalidtoken'})
        .expect(401)
    })

    it('do not create comment with invalid input', async() => {
        const jestResponse = await request(app)
        .post('/posts/1/comments')
        .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyIiwiaWF0IjoxNzI1ODk1Njg4LCJleHAiOjE3MjY3NTk2ODh9.iBTlfgm5llxKCjVt8NoEPOuskmVu1znTok4_aR6Nc3o'})
        .send({content: 'no'})
        .expect(400)

        expect(jestResponse.body).toEqual({
            errorsMessages: [
                {
                message: 'Must be 20 to 300 characters',
                field: 'content'
            }],
        })

        const jestResponse2 = await request(app)
        .post('/posts/1/comments')
        .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyIiwiaWF0IjoxNzI1ODk1Njg4LCJleHAiOjE3MjY3NTk2ODh9.iBTlfgm5llxKCjVt8NoEPOuskmVu1znTok4_aR6Nc3o'})
        .send({content: 125})
        .expect(400)

        expect(jestResponse2.body).toEqual({
            errorsMessages: [
                {
                message: 'Must be a string',
                field: 'content'
            }],
        })

        const jestResponse3 = await request(app)
        .post('/posts/1/comments')
        .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyIiwiaWF0IjoxNzI1ODk1Njg4LCJleHAiOjE3MjY3NTk2ODh9.iBTlfgm5llxKCjVt8NoEPOuskmVu1znTok4_aR6Nc3o'})
        .expect(400)

        expect(jestResponse3.body).toEqual({
            errorsMessages: [
                {
                message: 'Content required',
                field: 'content'
            }],
        })
    })

    it('do not create comment to a non-existent post', async()=> {
        await request(app)
        .post('/posts/999/comments')
        .set({Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyIiwiaWF0IjoxNzI1ODk1Njg4LCJleHAiOjE3MjY3NTk2ODh9.iBTlfgm5llxKCjVt8NoEPOuskmVu1znTok4_aR6Nc3o'})
        .send({content: 'Sed ut perspiciatis unde omnis iste natus error'})
        .expect(404)
    })

   // it('create comment, check response, check creation in DB')

})

   



       


