import { Request, Response, NextFunction } from "express"
import { adminsDB } from "../db/admins"

export const requestAuthorization = (req:Request, res:Response, next:NextFunction) => {

    const auth = req.headers.authorization as string
   
    if (!auth || auth.slice(0,6) !== 'Basic ') {
        res.sendStatus(401)
        return;
    }

    const encodedAuth = auth.slice(6, Infinity)
    
    if(adminsDB.find(p=>p.base64 === encodedAuth)) {
    next(); 
    } else {
    return res.sendStatus(401);
    }
}