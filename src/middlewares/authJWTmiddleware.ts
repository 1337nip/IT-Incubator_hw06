import {Request, Response, NextFunction } from "express";
import { jwtService } from "../services/jwtService";


export const authJWTmiddleware = async (req:Request, res:Response, next:NextFunction) => {
    if(!req.headers.authorization) {
    res.sendStatus(401)
    return;
    }
    const token:string = req.headers.authorization.split(' ')[1]
    try {
        req.userId = await jwtService.jwtGetUserId(token)
        next()
    }
    catch {
        res.sendStatus(401)
        return;
    }
}