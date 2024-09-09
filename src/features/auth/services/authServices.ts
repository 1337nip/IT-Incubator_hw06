import { userCollection } from "../../../db/mongo-db";
import { ErrorResponse } from "../../../types/sharedTypes";
import { checkPassword } from "../../../utilities/passwordHashing";

export const authService = {
    
    async login(loginOrEmail:string, password:string):Promise<boolean|ErrorResponse> {
        
        try {
            const filter = {
               $or: [{login:loginOrEmail}, {email:loginOrEmail}]
                }
            const result = await userCollection.findOne(filter)
            if(result === null)
            return false;
            
            const pswCheck = await checkPassword(password, result.passwordHash)
            if(pswCheck === false) 
            return false;
            
            return true;
        }

        catch(error) {
        throw new Error(`Cannot execute login: ${(error as Error).message}`)
        }
    }
}