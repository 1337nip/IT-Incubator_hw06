import { SortDirection } from "mongodb"

export const commentQueryHelper = (query: {[key:string] : string | undefined}) => {
    return {
        pageNumber : query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
        sortBy : query.sortBy ? query.sortBy: 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection as SortDirection: 'desc',
    }
}
