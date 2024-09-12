import { userCollection } from "../../../db/mongo-db";
import { authMeViewModel, getUsersReturn, userDbModel, userPaginationModel, userQuery, userViewModel} from "../models/userModels";
import { userQueryHelper } from "../utilities/userQueryHelper";
import { countPages } from "../../../utilities/others/pagesCount";


export const userQueryRepo = {
    
    async findUser(id:string):Promise<userViewModel|null> {
        const user = await userCollection.findOne({id})
        if(user === null)
            return null;

        const userOutput = {
                id:user.id,
                login: user.login,
                email: user.email,
                createdAt: user.createdAt
            }
        return userOutput;
    },

    async getUsers(query:{[key:string] : string | undefined}):Promise<userPaginationModel> {
        
        const processedQuery:userQuery = userQueryHelper(query)
        
        let filter:any = {}
        let orCondition = []
        if(processedQuery.searchLoginTerm)
        orCondition.push( {login: new RegExp (processedQuery.searchLoginTerm,'i')})
        if(processedQuery.searchEmailTerm)
        orCondition.push({email : new RegExp (processedQuery.searchEmailTerm,'i')})
        if (orCondition.length>0)
        filter.$or = orCondition
        //filter = {$or : [{login:}, {emai:}]}

        const users= await userCollection
                            .find(filter)
                            .sort(processedQuery.sortBy, processedQuery.sortDirection)
                            .skip((processedQuery.pageNumber - 1)*processedQuery.pageSize)
                            .limit(processedQuery.pageSize)
                            .toArray()
        const totalCount = await userCollection.countDocuments(filter)
        const pagesCount = countPages(totalCount,processedQuery.pageSize)
        
        const usersOutput:userViewModel[] = users.map(users =>{
            return {
                id:users.id,
                login: users.login,
                email: users.email,
                createdAt: users.createdAt
            }
        })
        return  {
            "pagesCount": pagesCount,
            "page": processedQuery.pageNumber,
            "pageSize": processedQuery.pageSize,
            "totalCount": totalCount,
            "items": usersOutput
            }
     },

     async findUserByToken (id:string):Promise<authMeViewModel|null> {
        const user = await userCollection.findOne({id})
        if(user === null)
            return null;

        const userOutput = {

                email: user.email,
                login: user.login,
                userId: user.id
            }
            
        return userOutput;
    },
}
