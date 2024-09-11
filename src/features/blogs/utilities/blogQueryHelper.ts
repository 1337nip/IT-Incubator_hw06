import { SortDirection } from "mongodb"

export const blogQueryHelper = (query: {[key:string] : string | undefined}):{pageNumber:number, pageSize:number, sortBy:string, sortDirection:SortDirection, searchNameTerm:string|null} => {
    return {
        pageNumber : query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
        sortBy : query.sortBy ? query.sortBy: 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection as SortDirection: 'desc',
        searchNameTerm: query.searchNameTerm ? query.searchNameTerm: null
    }
}