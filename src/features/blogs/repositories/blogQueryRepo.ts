import { blogsCollection } from "../../../db/mongo-db"
import { blogPaginationModel } from "../models/blogOutputModels"
import { blogsViewModel } from "../models/blogOutputModels"

import { blogQueryHelper } from "../utilities/blogQueryHelper"

export const blogsQueryRepo = {

    async getAllBlogs(query:{[key: string]: string | undefined}):Promise<blogPaginationModel>  {

    const processedQuery = blogQueryHelper(query)
    const filter = processedQuery.searchNameTerm ? {name: new RegExp (processedQuery.searchNameTerm,'i')} : {}
    const allBlogs  = await  blogsCollection
                    .find(filter, {projection: {_id:0}})
                    .sort(processedQuery.sortBy, processedQuery.sortDirection)
                    .skip((processedQuery.pageNumber - 1)*processedQuery.pageSize)
                    .limit(processedQuery.pageSize)
                    .toArray()
    const totalCount = await blogsCollection.countDocuments(filter)
    const pagesCount = Math.ceil(totalCount / processedQuery.pageSize)
        return {
            "pagesCount": pagesCount,
            "page": processedQuery.pageNumber,
            "pageSize": processedQuery.pageSize,
            "totalCount": totalCount,
            "items": allBlogs
        }
    },

    async findBlog(id:string):Promise<blogsViewModel | null> {
        
            const blog = await blogsCollection.findOne({id})
            if(!blog) 
             return null;
            
            const blogOutput:blogsViewModel = {
                id: blog.id,
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: blog.createdAt,
                isMembership: blog.isMembership
            }    
            return blogOutput;
     }
        
}

