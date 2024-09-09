import { commentCollection } from "../../../db/mongo-db";
import { commentViewModel } from "../models/commentModels";

export const commentQueryRepo = {
    async findComment(id:string):Promise<commentViewModel|null> {
        const comment = await commentCollection.findOne({id})
        if(comment ===null)
        return null;

        const commentOuput:commentViewModel = {
            id:comment.id,
            content: comment.content,
            commentatorInfo: comment.commentatorInfo,
            createdAt: comment.createdAt
        }
        return commentOuput;
    }
}