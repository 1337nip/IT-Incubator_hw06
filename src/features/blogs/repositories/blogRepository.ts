
import { blogsCollection } from "../../../db/mongo-db"
import { blogUpdateModel } from "../models/blogInputModels"
import { blogsDbModel } from "../models/blogType"




export const blogsRepository = {

    async getAllBlogs(): Promise<blogsDbModel[]> {
       return blogsCollection.find({}, {projection: {_id:0}}).toArray()
    },

    async deleteBlog(passedID:string) {
     
     const result =  await blogsCollection.deleteOne({id : passedID})

     if (result.deletedCount === 0) {
        throw new Error ('Blog Not found')
        }
    },

    async createBlog(newBlog:blogsDbModel):Promise<void> {
    
        try {
        await blogsCollection.insertOne(newBlog)
        }
        catch (error) {
            throw new Error (`Cannot create new blog in repository: ${(error as Error).message}`)
        }
        
    },
    
    async updateBlog(passedID:string, passedData:blogUpdateModel):Promise<void> {
        const {name, description,websiteUrl} = passedData
        const result= await blogsCollection.updateOne({id: passedID}, {$set: {name, description,websiteUrl}})

        if (result.matchedCount === 0) {
            throw new Error ('Document is not updated in repository')
        }
    }
}