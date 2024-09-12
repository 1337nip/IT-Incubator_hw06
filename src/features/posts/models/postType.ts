import { ObjectId } from "mongodb"

export type postsDbModel = {

    _id:ObjectId
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string

}
