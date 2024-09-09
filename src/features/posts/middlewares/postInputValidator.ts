import { body } from "express-validator";
import { blogsCollection } from "../../../db/mongo-db";

export const postInputValidator =[ 

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

    body('blogId')
    .exists({checkFalsy:true}).withMessage('Blog id required')
    .isString().withMessage('Must be a string')
    .trim()
    .isLength({min:1}).withMessage('Length cannot be empty')
    .custom(async (value) => {
        try {
        let result = await blogsCollection.findOne({id : value})
        if (result === null) {
           return Promise.reject();
        }
        return true;
    }   
    catch (error) {
        console.error('No blog with such id exists')
        }
    }).withMessage('No blog with such id exists')
   
]