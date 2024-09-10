import { profileEnd } from "console";
import { commentCollection, postsCollection } from "../../../db/mongo-db";
import { commentViewModel, commentPaginationModel } from "../models/commentModels";
import { commentQueryHelper } from "../utilities/commentQueryHelper";

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
    },

    async getAllComments(postId:string, query:{[key:string] : string | undefined}):Promise<commentPaginationModel | null> {
        const checkPost = await postsCollection.findOne({id:postId})
        if(checkPost === null)
        return null;
        
        const processedQuery = commentQueryHelper(query)

        const items = await commentCollection
        .find({postId:postId}, {projection: {_id:0, postId:0}})
        .sort(processedQuery.sortBy,processedQuery.sortDirection)
        .skip((processedQuery.pageNumber-1)*processedQuery.pageSize)
        .limit(processedQuery.pageSize)
        .toArray()

        const totalCount = await commentCollection.countDocuments({postId: postId})
        const pagesCount = Math.ceil(totalCount/processedQuery.pageSize)

        return {
            'pagesCount': pagesCount,
            'page': processedQuery.pageNumber,
            'pageSize': processedQuery.pageSize,
            'totalCount': totalCount,
            'items': items
        }
    }
}