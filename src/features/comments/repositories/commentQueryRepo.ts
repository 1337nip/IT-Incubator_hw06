import { Result, StatusCode } from "../../../types/sharedTypes";
import { commentCollection, postsCollection } from "../../../db/mongo-db";
import { commentViewModel, commentPaginationModel } from "../models/commentModels";
import { commentQueryHelper } from "../utilities/commentQueryHelper";
import { countPages } from "../../../utilities/others/pagesCount";

export const commentQueryRepo = {
    async findComment(id:string):Promise<Result<commentViewModel>> {
        const comment = await commentCollection.findOne({id})
        if(!comment)
        return  { 
            statusCode: StatusCode.NotFound,
            errorMessage: 'Comment not found',
            }

        const commentOuput:commentViewModel = {
            id:comment.id,
            content: comment.content,
            commentatorInfo: comment.commentatorInfo,
            createdAt: comment.createdAt
        }
        return  { 
            statusCode: StatusCode.Success,
            data: commentOuput
            }
    },

    async getAllComments(postId:string, query:{[key:string] : string | undefined}):Promise<Result<commentPaginationModel | string>> {
        const result = await postsCollection.findOne({id:postId})
        if(!result)
        return {
            statusCode: StatusCode.NotFound,
            errorMessage: 'Post not found'
        }
        
        const processedQuery = commentQueryHelper(query)

        const items = await commentCollection
        .find({postId:postId}, {projection: {_id:0, postId:0}})
        .sort(processedQuery.sortBy,processedQuery.sortDirection)
        .skip((processedQuery.pageNumber-1)*processedQuery.pageSize)
        .limit(processedQuery.pageSize)
        .toArray()

        const totalCount = await commentCollection.countDocuments({postId: postId})
        const pagesCount = countPages(totalCount, processedQuery.pageSize)

        return {
            statusCode:StatusCode.Success,
            data: {
                'pagesCount': pagesCount,
                'page': processedQuery.pageNumber,
                'pageSize': processedQuery.pageSize,
                'totalCount': totalCount,
                'items': items
            }
        }
    }
} 