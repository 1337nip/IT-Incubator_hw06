import { postsDbModel } from "../models/postType";
import {  postsCollection } from "../../../db/mongo-db";
import { postUpdateModel } from "../models/postInputModels";
import { ErrorResponse } from "../../../types/sharedTypes";
import { postsViewModel } from "../models/postOutputModels";

export const postsRepository = {

   async getAllPosts():Promise<postsDbModel[]> {
      return postsCollection.find({}, {projection: {_id:0}}).toArray()
   },
 
   async deletePost(passedID:string) {
      
      const result =  await postsCollection.deleteOne({id : passedID})

      if (result.deletedCount === 0) {
         throw new Error ('Not found')
      }     
  },

  async createPost(newPost:postsDbModel):Promise<string | ErrorResponse> {

      try {
         await postsCollection.insertOne(newPost)
         return newPost.id
      }
      catch (error) {
         throw new Error (`Cannot create new blog in repository: ${(error as Error).message}`)
      }
   
   },

   async updatePost(passedID:string, passedData:postUpdateModel) {
      const {title, shortDescription,content,blogId} = passedData
      const result = await postsCollection.updateOne({id:passedID}, {$set: {title,shortDescription,content,blogId}})
      if (result.matchedCount === 0) {
         throw new Error ("Cannot update post in repository")
      }
   },

   async createPostByBlog(newPost:postsDbModel):Promise<void | ErrorResponse> {
      
      try { 
      await postsCollection.insertOne(newPost)
      }
      catch (error) {
         throw new Error(`Cannot create new post with blog id in repository: ${(error as Error).message}`)
      }
   },

   async findPost(postId:string):Promise<postsViewModel | null>{
      return await postsCollection.findOne({id: postId})
   }
}
