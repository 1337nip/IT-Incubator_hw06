import { MongoMemoryServer } from 'mongodb-memory-server';
import { connectToDb, blogsCollection } from '../src/db/mongo-db';
import request from 'supertest';
import {app} from '../src/app'
import { blogsViewModel } from '../src/features/blogs/models/blogOutputModels';

describe ('/blogs/', () => {

let mongod:MongoMemoryServer

    beforeAll(async() => {
        mongod = await MongoMemoryServer.create()
        const uri = mongod.getUri()
        await connectToDb(uri)

        await blogsCollection.drop()
        console.log('Drop successful')
    })

    afterAll(async () => {
        await mongod.stop();
    })

    it('create blog with authorization and correct input check', async() =>{
        const jestResponse = await request(app)
                .post('/blogs')
                .set({'Authorization': 'Basic YWRtaW46cXdlcnR5' })
                .send({"name":"Boss-werewolf", "description":"no shit", "websiteUrl":"https://reddit.org"})
                .expect(201)
        
        const createdBlog:blogsViewModel = jestResponse.body

        expect(createdBlog).toEqual({
            id: "1",
            name: 'Boss-werewolf', 
            description: 'no shit',
            websiteUrl: "https://reddit.org",
            createdAt: expect.any(String),
            isMembership:false
        })
        
        await request(app)
            .get('/blogs')
            .expect(200, [createdBlog])

    });

    it('do not create blog without autorization', async() => {
        await request(app)
            .post('/blogs')
            .set({'Authorization' : 'Basic sdfgsdfglErxf'})
            .expect(401)
    }) 
    
    it('find blog with correct /:id', async() => {
        const jestResponse = await request(app)
            .get("/blogs/1")
            expect(200)
        
        const blog = jestResponse.body
        console.log(blog)
        expect(blog).toEqual({
            id: "1",
            name: 'Boss-werewolf', 
            description: 'no shit',
            websiteUrl: "https://reddit.org",
            createdAt: expect.any(String),
            isMembership:false
        })
    })

    it('do not find block with non-existent /:id', async() => {
       await request(app)
        .get("/blogs/99")
        expect(404)

    })


})