import { body } from "express-validator";

export const commentInputValidator =[ 

    body('content')
    .exists({checkFalsy:true}).withMessage('Content required')
    .isString().withMessage('Must be a string')
    .trim()
    .isLength({min:20, max:300}).withMessage('Must be 20 to 300 characters')

]
