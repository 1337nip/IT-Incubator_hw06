import {Request, Response, NextFunction} from 'express'
import { validationResult} from "express-validator"


export const returnValidationErrors=  (req:Request, res:Response, next:NextFunction) => {
    
    const errors = validationResult(req)

        if(!errors.isEmpty()) {

            const errorsFormatted = errors.array({onlyFirstError: true}).map(e => {

                if ('path' in e) {

                    return {
                        message: e.msg,
                        field: e.path
                    };

                } else {
                    return {msg: e.msg, path: 'unknown'};
                }
            })
        
            res.status(400).json({errorsMessages: errorsFormatted})
            return;
            }

    next();
}