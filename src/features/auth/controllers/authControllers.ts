import { Request, Response } from "express";
import { accessToken, authLoginModel } from "../models/authModels";
import { ErrorResponse } from "../../../types/sharedTypes";
import { authService } from "../services/authServices";
import { userQueryRepo } from "../../users/repositories/userQueryRepo";
import { authMeViewModel } from "../../users/models/userModels";


export const authControllers = {

    async authLogin(req:Request<{},{},authLoginModel>, res:Response<accessToken|ErrorResponse>) {
        try {
           const result = await authService.login(req.body.loginOrEmail, req.body.password)
            if(result === false) 
            res.sendStatus(401)
            else 
            if (result)
            res.status(200).json({"accessToken": result as string})
        }
        catch(error) {
        console.error(`Server fail when trying to login: ${(error as Error).message}`)
        res.sendStatus(500)
        }
    },

    async authMe(req:Request, res:Response<authMeViewModel>) {
        try {
            const result = await userQueryRepo.findUserByToken(req.userId!)
            res.status(200).json(result!)
            return;      
        }
        catch (error){
            console.error(error)
            res.sendStatus(500)
        }
    }
}