import { userCreateModel, userDbModel } from "../models/userModels";
import { userCollection } from "../../../db/mongo-db";

export const userRepository = {
    
    async createUser(newUser:userCreateModel):Promise<void> {
        await userCollection.insertOne(newUser)
    },
    
    async deleteUser(id:string):Promise<void> {
        await userCollection.deleteOne({id})
    }
}