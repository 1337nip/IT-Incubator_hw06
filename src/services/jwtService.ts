import jwt from 'jsonwebtoken'
import { userDbModel } from '../features/users/models/userModels'
import { SETTINGS } from '../settings'
import { userCollection } from '../db/mongo-db'

export const jwtService = {
    async jwtCreate(user:userDbModel):Promise<string> {
        const token = jwt.sign({userId:user.id}, SETTINGS.JWT.SECRET, {expiresIn: '10 days'})
        return token;
    },

    async jwtGetUserId(token:string):Promise<string> {
        try {
           const result:any = jwt.verify(token, SETTINGS.JWT.SECRET)

           const userCheck = await userCollection.findOne({id: result.userId})
           if (userCheck ===null) {
            throw new Error('User with this id does not exist')
           }
            return result.userId
           }
        catch (error) {
            console.error(`JWTGetUserId $((error as Error).message)`)
            throw new Error

        }
    }
}  