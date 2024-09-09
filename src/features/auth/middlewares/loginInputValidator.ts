import { body } from "express-validator";


export const loginInputValidator =[ 

    body('loginOrEmail')
    .exists({checkFalsy:true}).withMessage('Login required')
    .isString().withMessage('Must be a string'),
  
    body('password')
    .exists({checkFalsy:true}).withMessage('Password required')
    .isString().withMessage('Must be a string')
   
]