
import { blogCreateModel, blogUpdateModel } from "../models/blogInputModels";
import { blogsDbModel } from "../models/blogType";
import { blogsRepository } from "../repositories/blogRepository";
import { blogsCollection } from "../../../db/mongo-db";
import { Error404 } from "../../../types/sharedTypes";
import { ObjectId } from "mongodb";

export const blogService = {

    async deleteBlog (id:string):Promise <void> {

        try {
        await blogsRepository.deleteBlog(id)
        }
        catch (error) {
        throw new Error (`Cannot delete blog in repository: ${(error as Error).message}`)

        }
    },
   
    async createBlog(body:blogCreateModel):Promise<string> {
        const {name, description,websiteUrl} = body

     const newObjId = new ObjectId

        const newBlog:blogsDbModel = {
            _id: newObjId,
            id: newObjId.toString(),
            name,
            description,
            websiteUrl,
            createdAt:(new Date()).toISOString(),
            isMembership: false
        }

        try {
            await blogsRepository.createBlog(newBlog)
            return newBlog.id
        }
        catch (error) {
            throw new Error (`Cannot create new blog in repository: ${(error as Error).message}`)
        }
    },

    async updateBlog(id:string, body:blogUpdateModel):Promise<void> {
        const result = await blogsCollection.findOne({id})
        if(result === null) {
            throw new Error404('Blog to udpate is not found')
        }
        try {
            await blogsRepository.updateBlog(id, body)
        } catch (error) {
            throw new Error(`Cannot update blog: ${(error as Error).message}`)
        }
    } 
}
    
