import { userQuery } from "../models/userModels"

export const userQueryHelper = (query: {[key:string] : string|undefined}):userQuery => {
    return {
        pageNumber : query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
        sortBy : query.sortBy ? query.sortBy: 'createdAt',
        sortDirection: query.sortDirection === 'asc' || query.sortDirection === 'desc' ? query.sortDirection : 'desc',
        searchLoginTerm: query.searchLoginTerm ? query.searchLoginTerm: null,
        searchEmailTerm: query.searchEmailTerm ? query.searchEmailTerm: null
    }
}
