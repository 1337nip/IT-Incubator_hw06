import { MongoMemoryServer } from 'mongodb-memory-server';
import { connectToDb, commentCollection, userCollection, postsCollection } from '../src/db/mongo-db';
import request from 'supertest';
import {app} from '../src/app'
import { fillUsers, fillPosts, fillComments } from './testData';
import { commentViewModel } from '../src/features/comments/models/commentModels';


describe ('/comments/', () => {
const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmUyOGQ5MWM0ZjNiN2YxMjA0ZTIyMmEiLCJpYXQiOjE3MjYxMjM0MzksImV4cCI6MTcyNjk4NzQzOX0.pDMDisUHQh9NdPUvS5Mt0U054170Wj0e8vVMML-fFIU' //Bohr
const token2 = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmUyOTEyNGM0ZjNiN2YxMjA0ZTIyMmMiLCJpYXQiOjE3MjYxMjQzNTEsImV4cCI6MTcyNjk4ODM1MX0.NZ96IGyrrtEH5KZTdmnnvmktr3G9eIC2qazmlfLbvSo' //Kurchatov

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
        await commentCollection.insertMany(fillComments)
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
        .set({Authorization: token})
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
        .set({Authorization: token})
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
        .set({Authorization: token})
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
        .set({Authorization: token})
        .send({content: 'Sed ut perspiciatis unde omnis iste natus error'})
        .expect(404)
    })

   it('create comment, check response, check creation in DB', async()=> {
    const jestResponse = await request(app)
        .post('/posts/1/comments')
        .set({Authorization: token})
        .send({content: 'Sed ut perspiciatis unde omnis iste natus error'})
        .expect(201)

        expect(jestResponse.body).toEqual({
            id: expect.any(String),
            content: "Sed ut perspiciatis unde omnis iste natus error",
            commentatorInfo: {
                userId: '66e28d91c4f3b7f1204e222a',
                userLogin: 'Bohr'
            },
            "createdAt": expect.any(String)
        })

        const jestResponse2 = await request(app)
        .get(`/comments/${jestResponse.body.id}`)
        .expect(200)

        expect(jestResponse2.body).toEqual({
            id: jestResponse.body.id,
            content: "Sed ut perspiciatis unde omnis iste natus error",
            commentatorInfo: {
                userId: '66e28d91c4f3b7f1204e222a',
                userLogin: 'Bohr'
            },
            "createdAt": expect.any(String)
        })
   })
   
   it('do not update a comment without token', async()=>{
    await request(app)
    .put('/comments/1')
    .expect(401)
})

   it('do not update a non-existent comment', async()=>{
        await request(app)
        .put('/comments/5551')
        .set({Authorization: token})
        .send({content: 'Et harum quidem rerum facilis est et expedita distinctio'})
        .expect(404)
   })

   it('do not update a post that is not yours', async() =>{
        await request(app)
        .put('/comments/1')
        .set({Authorization: token2})
        .send({content: 'Et harum quidem rerum facilis est et expedita distinctio'})
        .expect(403)
   })

   it('do not update comment with invalid comment input', async() => {
        const jestResponse = await request(app)
        .put('/comments/1')
        .set({Authorization: token})
        .send({content: 'no'})
        .expect(400)

        expect(jestResponse.body).toEqual({
            errorsMessages: [
                {
                message: 'Must be 20 to 300 characters',
                field: 'content'
            }],
        })     
   })

   it('update post, check update in DB', async ()=>{
         await request(app)
        .put('/comments/1')
        .set({Authorization: token})
        .send({content: 'Et harum quidem rerum facilis est et expedita distinctio'})
        .expect(204)
    
        const jestResponse = await request(app)
        .get('/comments/1')
        .expect(200)

        expect(jestResponse.body).toEqual({
            id: "1",
            content: "Et harum quidem rerum facilis est et expedita distinctio",
            commentatorInfo: {
                userId: '66e28d91c4f3b7f1204e222a',
                userLogin: 'Bohr'
            },
            "createdAt": expect.any(String)
        })
   })

   it('do not delete comment without valid token', async() => {
    await request(app)
    .delete('/comments/1')
    .expect(401)

    await request(app)
    .delete('/comments/1')
    .set({Authorization: 'someinvalidtoken'})
    .expect(401)
})

   it('do not delete a non-existent comment', async() =>{
        await request(app)
        .delete('/comments/555')
        .set({Authorization: token})
        .expect(404)
   })

   it ('do not delete comment that is not yours', async()=> {
        await request(app)
        .delete('/comments/1')
        .set({Authorization: token2})
        .expect(403)
})

   it('delete comment, check deletion in DB', async()=> {
        await request(app)
        .delete('/comments/1')
        .set({Authorization: token})
        .expect(204)

        await request(app)
        .get('/comments/1')
        .expect(404)
   })

   it('return 404 for invalid postId/comments', async() =>{
        await request(app)
        .get('/posts/5555/comments')
        .expect(404)
   })


   it('return allComments for postId with default pagination', async() =>{
        //await (commentCollection).insertMany(fillComments)
        const check = await commentCollection
        .find({postId:'1'}, {projection: {_id:0, postId:0 } })
        .sort('createdAt', 'desc')
        .limit(10)
        .toArray()

        const totalCount = await commentCollection.countDocuments({postId:`1`})
        const pagesCount = Math.ceil(totalCount/10)

        const checkOutput = {
            "pagesCount": pagesCount,
            "page": 1,
            "pageSize": 10,
            "totalCount": totalCount,
            "items": check
        }

        const jestResponse = await request(app)
        .get('/posts/1/comments')
        .expect(200)

        expect(jestResponse.body).toEqual(checkOutput)
   })

   it('return allComments for postId with query pagination', async() =>{
       
     const check = await commentCollection
        .find({postId:'1'}, {projection: {_id:0, postId:0 }})
        .sort('content', 'asc')
        .skip(3) 
        .limit(3)
        .toArray()

        const totalCount = await commentCollection.countDocuments({postId:`1`})
        const pagesCount = Math.ceil(totalCount/3)

        const checkOutput = {
            "pagesCount": pagesCount,
            "page": 2,
            "pageSize": 3,
            "totalCount": totalCount,
            "items": check
        }

        const jestResponse = await request(app)
        .get('/posts/1/comments')
        .query({sortBy:'content', sortDirection: 'asc', pageSize:'3', pageNumber:'2'})
        .expect(200)

        expect(jestResponse.body).toEqual(checkOutput)
    })
})

   



       


