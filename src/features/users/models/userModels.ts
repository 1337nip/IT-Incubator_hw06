import { ObjectId } from "mongodb"

export type userDbModel = {
        
        _id?: ObjectId
        id: string
        login:string
        passwordHash: string
        email: string
        createdAt : string
}

export type userViewModel = {
    
        id:string
        login:string
        email: string
        createdAt : string
}

export type userPaginationModel = {
        
        _id?: ObjectId,
        pagesCount: number,
        page: number,
        pageSize: number,
        totalCount: number,
        items: userViewModel[]
}

export type userInputModel = {
        login:string
        password: string
        email: string
}

export type userCreateModel = {
        id:string
        login:string
        passwordHash: string
        email: string
        createdAt:string
}

export type userQuery = {
    sortBy: string,
    sortDirection: 'asc' | 'desc',
    pageNumber : number,
    pageSize : number,
    searchLoginTerm : string|null
    searchEmailTerm : string|null
}

export type getUsersReturn = {
        users: userDbModel[],
        totalCount: number
}

export type authMeViewModel = {
        email: string,
        login:  string,
        userId: string
}