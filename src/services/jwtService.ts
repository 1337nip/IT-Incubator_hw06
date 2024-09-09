import jwt from 'jsonwebtoken'
import { userDbModel } from '../features/users/models/userModels'
import { SETTINGS } from '../settings'

export const jwtService = {
    async jwtCreate(user:userDbModel):Promise<string> {
        const token = jwt.sign({userId:user.id}, SETTINGS.JWT.SECRET, {expiresIn: '10 days'})
        return token;
    }
}