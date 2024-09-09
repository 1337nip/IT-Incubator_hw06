import { userCollection } from "../../../db/mongo-db";
import { Error404, ErrorsMessages } from "../../../types/sharedTypes";
import { userCreateModel, userDbModel, userInputModel, userViewModel } from "../models/userModels";
import { userQueryRepo } from "../repositories/userQueryRepo";
import { userRepository } from "../repositories/userRepository";
import { checkUnique } from "../utilities/checkUnique";
import { hashPassword } from "../../../utilities/passwordHashing";


export const userService = {

    async createUser(body:userInputModel):Promise<string | ErrorsMessages> {
        const {login, password, email} = body
        const uniqueError = await checkUnique(login, email)
        if (uniqueError) 
            return uniqueError;
        
        let id:string
        const newest = await userCollection.findOne({}, {sort: {_id: -1}})
        if (newest) {
        id = (Number(newest.id)+1).toString()
        } else {
        id = "1"
        }

        const passwordHash = await hashPassword(password)
        const newUser:userCreateModel = {
            id,
            login,
            passwordHash,
            email,
            createdAt:(new Date()).toISOString()
        }
        try {
            await userRepository.createUser(newUser)
            return id;
        }
        catch(error) {
            throw new Error(`Cannot create new user in repository: ${(error as Error).message}`)
        }
        
    },

    async deleteUser(id:string):Promise<void | ErrorsMessages> {
            const result = await userQueryRepo.findUser(id)
            if(result === null)
                throw new Error404('Cannot find user to delete')
        try {
            await userRepository.deleteUser(id)
        }
        catch (error) {
            throw new Error (`(Service) Cannot delete user: ${(error as Error).message}`)
        }  
    }
}