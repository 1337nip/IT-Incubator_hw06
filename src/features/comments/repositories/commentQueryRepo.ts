import { profileEnd } from "console";
import { commentCollection } from "../../../db/mongo-db";
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

    async getAllComments(id:string, query:{[key:string] : string | undefined}):Promise<commentPaginationModel> {
        const processedQuery = commentQueryHelper(query)

        const items = await commentCollection
        .find({postId:id}, {projection: {_id:0, postId:0}})
        .sort(processedQuery.sortBy,processedQuery.sortDirection)
        .skip((processedQuery.pageNumber-1)*processedQuery.pageSize)
        .limit(processedQuery.pageSize)
        .toArray()

        const totalCount = await commentCollection.countDocuments({postId: id})
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