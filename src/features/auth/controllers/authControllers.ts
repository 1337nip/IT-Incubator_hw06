import { Request, Response } from "express";
import { authLoginModel } from "../models/authModels";
import { ErrorResponse } from "../../../types/sharedTypes";
import { authService } from "../services/authServices";


export const authControllers = {

    async authLogin(req:Request<{},{},authLoginModel>, res:Response<ErrorResponse>) {
        try {
           const result = await authService.login(req.body.loginOrEmail, req.body.password)
            if(result === true) 
            res.sendStatus(204)
            else 
            res.sendStatus(401)
        }
        catch(error) {
        console.error(`Server fail when trying to login: ${(error as Error).message}`)
        res.sendStatus(500)
        }
    }
}