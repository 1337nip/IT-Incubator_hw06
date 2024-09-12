import { commentCollection } from "../../../db/mongo-db";
import { commentCreateModel, commentDbModel } from "../models/commentModels";

export const commentRepository = {
    async createComment(newComment:commentDbModel):Promise<void> {
        await commentCollection.insertOne(newComment)
    },

    async findComment(id:string):Promise<commentDbModel | null> {
        return await commentCollection.findOne({id:id})
    },


    async deleteComment(id:string):Promise<void | null>{
        const result = await commentCollection.deleteOne({id:id})
        if(result.deletedCount === 0)
        return null;
    },

    async updateComment(id:string, content:string):Promise<void> {
        await commentCollection.updateOne({id}, {$set: {content: content}})
    }
}