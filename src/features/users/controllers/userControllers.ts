import { ErrorResponse, ErrorsMessages } from "../../../types/sharedTypes";
import { userInputModel, userPaginationModel, userViewModel } from "../models/userModels";
import { Request, Response } from "express";
import { userService } from "../services/userService";
import { Error404 } from "../../../types/sharedTypes";
import { userQueryRepo } from "../repositories/userQueryRepo";

export const userControllers = {

    async createUser (req:Request<{}, {}, userInputModel>, res:Response<userViewModel | ErrorResponse | ErrorsMessages>) {
        try {
            const result = await userService.createUser(req.body)
            if(typeof result === 'object') 
                res.status(400).json(result)
            else {
                const user = await userQueryRepo.findUser(result)
                if(user)
                res.status(201).json(user)
            }
        }
        catch (error) {
            console.error(`Cannot create user in service: ${(error as Error).message}`)
            res.sendStatus(500)
        }
    },

    async getUsers (req:Request<{},{},{},{[key:string] : string | undefined}>, res:Response<userPaginationModel|ErrorResponse>) {
        try {
            const users = await userQueryRepo.getUsers(req.query)
            res.status(200).json(users)
        }
        catch(error) {
            console.error(`(Controller)Cannot fetch users: ${(error as Error).message}`)
            res.sendStatus(500)
        }
    },
    
    async deleteUser(req:Request<{id:string}>, res:Response<void|ErrorResponse>) {
        try {
            await userService.deleteUser(req.params.id)
            res.sendStatus(204)
        }
        catch(error) {
            if (error instanceof Error404) 
            res.sendStatus(404)
            else {
            console.error(`Cannot delete user: ${(error as Error).message}`)
            res.sendStatus(500)
            }
        }
    }
} 