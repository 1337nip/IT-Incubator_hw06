import { postsQueryRepo } from "../../posts/repositories/postQueryRepo"
import { Error404 } from "../../../types/sharedTypes"
import { commentCollection, postsCollection, userCollection } from "../../../db/mongo-db"
import { commentCreateModel, } from "../models/commentModels"
import { commentRepository } from "../repositories/commentRepository"
import { postsRepository } from "../../posts/repositories/postRepository"

export const commentService = {
    async createComment(postId:string, userId:string, content:string):Promise<string> {
        const checkPost = await postsCollection.findOne({id:postId})
        if (checkPost===null)
            throw new Error404('Post with this id does not exist')
        
        let id:string
        const newest = await commentCollection.findOne({}, {sort: {_id: -1}})
        if (newest) {
        id = (Number(newest.id)+1).toString()
        } else {
        id = "1"
        }

        const user = await userCollection.findOne({id: userId})

        const newComment:commentCreateModel= {
            id: id,
            postId:postId,
            content: content,
            commentatorInfo: {
              userId: userId,
              userLogin: user!.login
            },
            createdAt: (new Date()).toISOString()
        }

        await commentRepository.createComment(newComment)
        return id;
    }
}