import { body } from "express-validator";

export const blogInputValidator =[ 
    body('name')
    .exists({checkFalsy:true}).withMessage('Name required')
    .isString().withMessage('Must be a string')
    .trim()
    .isLength({min:1, max:15}).withMessage('Must be 1 to 15 characters'),

    body('description')
    .exists({checkFalsy:true}).withMessage('Description required')
    .isString().withMessage('Must be a string')
    .trim()
    .isLength({min:1, max:100}).withMessage('Must be 1 to 100 characters'),

    body('websiteUrl')
    .exists({checkFalsy:true}).withMessage('URL is required')
    .isString().withMessage('Must be a string')
    .trim()
    .isLength({min:1, max:500}).withMessage('Must be 1 to 500 characters')
    .isURL({protocols:['https']}).withMessage('Example: https://google.com')

]