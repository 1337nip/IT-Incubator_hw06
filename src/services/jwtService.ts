import jwt from 'jsonwebtoken'
import { userDbModel } from '../features/users/models/userModels'
import { SETTINGS } from '../settings'
import { userCollection } from '../db/mongo-db'
import { promisify } from 'util'

export const jwtService = {

    async jwtCreate(user:userDbModel):Promise<string> {
         return new Promise ((resolve,reject) => {
            jwt.sign(
                {userId:user.id}, SETTINGS.JWT.SECRET, {expiresIn: '10 days'}, 
                (err, token) => {
                    if(err) 
                        reject (new Error('jwtService: cannot jwt.sign'))
                    if (token) 
                        resolve(token)
                }
            )        
        })
    },

    async jwtGetUserId(token:string):Promise<string> {
        const result = await new Promise<any>((resolve, reject) => {
           jwt.verify(token, SETTINGS.JWT.SECRET,
            (err, decoded) => {
                if(err) {
                    reject ('Bad token: ' + err );
                } 
                if (decoded) {
                    resolve(decoded);
                }       
            })      
        })
        
        const userCheck = await userCollection.findOne({id: result.userId})
        if (!userCheck) 
            throw new Error('User with this id does not exist')
        return result.userId
    }
}