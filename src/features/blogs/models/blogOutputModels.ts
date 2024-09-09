export type blogsViewModel = {

    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
    
}

export type blogPaginationModel = {
    pagesCount: number,
    page: any
    pageSize: any
    totalCount: number
    items: blogsViewModel[]
}