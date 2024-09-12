import { userCollection } from "../../../db/mongo-db";
import { Error404, ErrorsMessages } from "../../../types/sharedTypes";
import { userCreateModel, userDbModel, userInputModel, userViewModel } from "../models/userModels";
import { userQueryRepo } from "../repositories/userQueryRepo";
import { userRepository } from "../repositories/userRepository";
import { checkUnique } from "../utilities/checkUnique";
import { hashPassword } from "../../../utilities/passwordHashing";
import { ObjectId } from "mongodb";


export const userService = {

    async createUser(body:userInputModel):Promise<string | ErrorsMessages> {
        const {login, password, email} = body
        const uniqueError = await checkUnique(login, email)
        if (uniqueError) 
            return uniqueError;
        
        const newObjId = new ObjectId
        const passwordHash = await hashPassword(password)
        const newUser:userDbModel = {
            
            _id: newObjId,
            id: newObjId.toString(),
            login,
            passwordHash,
            email,
            createdAt:(new Date()).toISOString()
        }
        try {
            await userRepository.createUser(newUser)
            return newUser.id;
        }
        catch(error) {
            throw new Error(`Cannot create new user in repository: ${(error as Error).message}`)
        }
        
    },

    async deleteUser(id:string):Promise<void | ErrorsMessages> {
            const result = await userQueryRepo.findUser(id)
            if(!result)
                throw new Error404('Cannot find user to delete')
        try {
            await userRepository.deleteUser(id)
        }
        catch (error) {
            throw new Error (`(Service) Cannot delete user: ${(error as Error).message}`)
        }  
    }
}