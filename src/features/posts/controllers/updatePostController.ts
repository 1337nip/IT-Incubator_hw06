import{Request, Response} from "express"
import { postService } from "../services/postService"
import { postUpdateModel } from "../models/postInputModels"
import { ErrorResponse } from "../../../types/sharedTypes"
import { Error404 } from "../../../types/sharedTypes"

export const updatePostController = async (req:Request<{id:string}, {}, postUpdateModel>, res:Response<void | ErrorResponse>) => {
    
    try {
        await postService.updatePost(req.params.id, req.body)
        res.sendStatus(204)
    }
    catch(error) {
        if (error instanceof Error404) {
        res.sendStatus(404)
        } else {
        res.sendStatus(500)
        console.error(`Cannot update post: ${(error as Error).message}`)
        }
    } 
}
