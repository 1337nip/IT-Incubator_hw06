import { ObjectId } from "mongodb"

export type postsViewModel = {

    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string

}

export type postPaginationModel = {
    pagesCount: number,
    page: any
    pageSize: any
    totalCount: number
    items: postsViewModel[]
}


