import { body } from "express-validator";


export const userInputValidator =[ 

    body('login')
    .exists({checkFalsy:true}).withMessage('Login required')
    .isString().withMessage('Must be a string')
    .trim()
    .isLength({min:3, max:10}).withMessage('Must be 3 to 10 characters')
    .matches(/^[a-zA-Z0-9_-]*$/).withMessage('Symbols are not allowed'),

    body('password')
    .exists({checkFalsy:true}).withMessage('Password required')
    .isString().withMessage('Must be a string')
    .trim()
    .isLength({min:6, max:20}).withMessage('Must be 6 to 20 characters'),

    body('email')
    .exists({checkFalsy:true}).withMessage('Email required')
    .isString().withMessage('Must be a string')
    .isEmail().withMessage('Must be an email: example@example.com')
]
