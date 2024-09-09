import { postsCollection } from "../../../db/mongo-db"
import { postQueryHelper } from "../utilities/postQueryHelper"
import { postPaginationModel, postsViewModel } from "../models/postOutputModels"
import { blogsCollection } from "../../../db/mongo-db"
import { Error404 } from "../../../types/sharedTypes"

export const postsQueryRepo = {

    async getAllPosts(query:{[key: string]: string | undefined}):Promise<postPaginationModel>  {
        const processedQuery = postQueryHelper(query)
        const allPosts  = await  postsCollection
                        .find({},{projection: {_id:0}})
                        .sort(processedQuery.sortBy, processedQuery.sortDirection)
                        .skip((processedQuery.pageNumber - 1)*processedQuery.pageSize)
                        .limit(processedQuery.pageSize)
                        .toArray()
        const totalCount = await postsCollection.countDocuments()
        const pagesCount = Math.ceil(totalCount / processedQuery.pageSize)
            return {
                "pagesCount": pagesCount,
                "page": processedQuery.pageNumber,
                "pageSize": processedQuery.pageSize,
                "totalCount": totalCount,
                "items": allPosts
            }
    },

    async getPostsById(passedID:string, query:any): Promise<postPaginationModel> {
        const result = await blogsCollection.findOne({id: passedID})
        if(result === null) 
            throw new Error404 ('Cannot find blog with this id') 
        
        const processedQuery = postQueryHelper(query)
        const filter = {blogId : passedID}
        const posts  = await  postsCollection
                        .find(filter, {projection: {_id:0}})
                        .sort(processedQuery.sortBy, processedQuery.sortDirection)
                        .skip((processedQuery.pageNumber - 1)*processedQuery.pageSize)
                        .limit(processedQuery.pageSize)
                        .toArray()
            const totalCount = await postsCollection.countDocuments({blogId: passedID})
            const pagesCount = Math.ceil(totalCount / processedQuery.pageSize)
            return {
                "pagesCount": pagesCount,
                "page": processedQuery.pageNumber,
                "pageSize": processedQuery.pageSize,
                "totalCount": totalCount,
                "items": posts
            }
        },
    
    async findPost(id:string): Promise<postsViewModel|null> {
        const post = await postsCollection.findOne({id})
        if(!post) 
        return null;

        const postOutput:postsViewModel = {
            id: post.id,
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt
        }
        return postOutput;
    },
}