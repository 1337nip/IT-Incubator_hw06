import { postCreateModel, postUpdateModel } from "../models/postInputModels";
import { postPaginationModel, postsViewModel } from "../models/postOutputModels";
import { postsQueryRepo } from "../repositories/postQueryRepo";
import { postsRepository } from "../repositories/postRepository";
import { postsCollection } from "../../../db/mongo-db";
import { blogsCollection } from "../../../db/mongo-db";
import { Error404, ErrorResponse} from "../../../types/sharedTypes";



export const postService = {

    async deletePost(id:string):Promise<void> {
        try {
            return await postsRepository.deletePost(id)
        }
        catch {
            throw new Error('Post not found')
        }
    },

    async createPost(body:postCreateModel): Promise<string| ErrorResponse> {
        const {title, shortDescription,content,blogId} = body
        
        let blogName:string
        const blog = await blogsCollection.findOne({id: blogId })

        if(blog) {
            blogName = blog.name
            } else {
           throw new Error404 ('No blog with such id is found')
            }
        
        let newID:string
        const newest = await postsCollection.findOne({}, {sort: {_id: -1}})
        if (newest) {
        newID = (Number(newest.id)+1).toString()
        } else {
        newID = "1"
        }

        const newPost:postsViewModel = {
            id: newID,
            title,
            shortDescription,
            content,
            blogId,
            blogName,
            createdAt:(new Date()).toISOString(),
            }

        try {
            await postsRepository.createPost(newPost)
            return newPost.id
        }
        catch(error) {
            throw new Error (`Cannot create new post in service: ${(error as Error).message}`)
        }
    },

    async updatePost(id:string, body:postUpdateModel):Promise<void> {
        const result = await postsCollection.findOne({id})
        if (result === null) {
            throw new Error404 ('Cannot find post to update')
        }
        try {
            await postsRepository.updatePost(id, body)
        }
        catch(error) {
            throw new Error (`Cannot update post: ${(error as Error).message}`)
        }
    },

    async createPostByBlog(blogId:string, body:postCreateModel):Promise<string | ErrorResponse> {

        const blog = await blogsCollection.findOne({id: blogId})
        if(blog === null) {
           throw new Error404 ('No blog with this id is found')
        }

        const {title, shortDescription,content} = body
        const newest = await postsCollection.findOne({}, {sort: {_id: -1}})
        let newID:string
  
        if (newest) {
           newID = (Number(newest.id)+1).toString()
           } else {
           newID = "1"
           }
  
        const blogName:string = blog.name
    
     
        const newPost:postsViewModel = {
            id: newID,
            title,
            shortDescription,
            content,
            blogId,
            blogName,
            createdAt:(new Date()).toISOString(),
           }

        try {
        await postsRepository.createPostByBlog(newPost)
        return newID;
        }
        catch(error) {
            throw new Error(`Cannot create new post with blog id in service: ${(error as Error).message}`)
        }
        
    }
}