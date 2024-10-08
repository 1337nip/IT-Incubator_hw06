
import { Result, StatusCode } from "../../../types/sharedTypes"
import { commentCollection, userCollection } from "../../../db/mongo-db"
import { commentCreateModel, commentDbModel, } from "../models/commentModels"
import { commentRepository } from "../repositories/commentRepository"
import { postsRepository } from "../../posts/repositories/postRepository"
import { ObjectId } from "mongodb"


export const commentService = {
    async createComment(postId:string, userId:string, content:string):Promise<Result<string >> {
        const checkPost = await postsRepository.findPost(postId)
        if (!checkPost) return {
            statusCode: StatusCode.NotFound,
            errorMessage: 'Post not found',
        } 
        
        const user = await userCollection.findOne({id: userId}) //TODO тут точно не должно быть запроса в БД
        const newObjId = new ObjectId
        const newComment:commentDbModel= {
           
            _id: newObjId,
            id: newObjId.toString(),
            postId:postId,
            content: content,
            commentatorInfo: {
              userId: userId,
              userLogin: user!.login
            },
            createdAt: (new Date()).toISOString()
        }

        await commentRepository.createComment(newComment)
        return {
            statusCode: StatusCode.Success,
            data: newComment.id
         }
    },

    async deleteComment(id:string, userId:string):Promise<Result<string>> {
        const checkComment = await commentRepository.findComment(id)
        if(!checkComment)
            return {
                statusCode: StatusCode.NotFound,
                errorMessage: 'Comment not found'
                } 
          
        if(checkComment.commentatorInfo.userId !== userId)
            return {
                statusCode: StatusCode.Forbidden,
                errorMessage: 'This user is not allowed to change this comment'
                } 

        await commentRepository.deleteComment(id)
        return {
            statusCode:StatusCode.Success
        }
    },

    async updateComment(id:string, userId:string, content:string ):Promise<Result<string>> {
        const result = await commentRepository.findComment(id)
        if(!result)
            return {
                statusCode: StatusCode.NotFound,
                errorMessage: 'Cannot find comment'
            }
        if(result.commentatorInfo.userId !== userId)
            return {
                statusCode:StatusCode.Forbidden,
                errorMessage: 'This user is not allowed to change this comment' 
            }

        await commentRepository.updateComment(id, content)
        return {
            statusCode:StatusCode.Success
        }
    }
}