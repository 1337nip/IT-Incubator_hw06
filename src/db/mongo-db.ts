import {Collection, Db, MongoClient } from "mongodb";
import { blogsDbModel as blogsDbModel } from "../features/blogs/models/blogType";
import { postsDbModel } from "../features/posts/models/postType";
import { config } from "dotenv";
import { userDbModel } from "../features/users/models/userModels";
import { commentDbModel } from "../features/comments/models/commentModels";
config()



let client: MongoClient = {} as MongoClient
let  db: Db= {} as Db

export let blogsCollection: Collection<blogsDbModel> = {} as Collection<blogsDbModel> 
export let postsCollection: Collection<postsDbModel> = {} as Collection<postsDbModel> 
export let userCollection: Collection<userDbModel> = {} as Collection<userDbModel>
export let commentCollection: Collection<commentDbModel> = {} as Collection<commentDbModel>

export const  connectToDb = async (MONGO_URL: string) => {
    try {
        client = new MongoClient(MONGO_URL)
        db = client.db(process.env.DB_name)
        blogsCollection = db.collection<blogsDbModel>('blogs')
        postsCollection = db.collection<postsDbModel>('posts')
        userCollection = db.collection<userDbModel>('users')
        commentCollection = db.collection<commentDbModel>('comments')

        await client.connect()
        await db.command({ ping: 1 });
        console.log('Connected to DB')
    }

    catch (err) {
        console.log(err)
        await client.close();
    }

}

export const eraseDB = async() => {
    await blogsCollection.deleteMany()
    await postsCollection.deleteMany()
    await userCollection.deleteMany()
    await commentCollection.deleteMany()
    
}