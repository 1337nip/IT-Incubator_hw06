import { commentCollection } from "../../../db/mongo-db";
import { commentCreateModel } from "../models/commentModels";

export const commentRepository = {
    async createComment(newComment:commentCreateModel):Promise<void> {
        await commentCollection.insertOne(newComment)
    }
}