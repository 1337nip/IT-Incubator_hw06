import { userCollection } from "../../../db/mongo-db"
import { ErrorsMessages } from "../../../types/sharedTypes"

export const checkUnique = async (login:string, email:string):Promise<ErrorsMessages | null> =>  {
    let result1 = await userCollection.findOne({login: login})
    if (result1) {
        return {
            errorsMessages: [{field: 'login', message: 'this login already exists'}]
            }
    }
    let result2 = await userCollection.findOne({email: email})
    if (result2) {
        return {
            errorsMessages: [{field: 'email', message: 'this email already exists'}]
            }
    }
    return null;
}