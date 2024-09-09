import { body } from "express-validator";
import { blogsCollection } from "../../../db/mongo-db";

export const postByBlogInputValidator =[ 

    body('title')
    .trim()
    .exists({checkFalsy:true}).withMessage('Title required')
    .isString().withMessage('Must be a string')
    .isLength({min:1, max:30}).withMessage('Must be 1 to 30 characters'),

    body('shortDescription')
    .trim()
    .exists({checkFalsy:true}).withMessage('Description required')
    .isString().withMessage('Must be a string')
    .isLength({min:1, max:100}).withMessage('Must be 1 to 100 characters'),

    body('content')
    .trim()
    .exists({checkFalsy:true}).withMessage('Content required')
    .isString().withMessage('Must be a string')
    .isLength({min:1, max:1000}).withMessage('Must be 1 to 1000 characters'),

]