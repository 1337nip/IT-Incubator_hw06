
import { Error404, ErrorResponse } from "../../../types/sharedTypes"
import { postPaginationModel } from "../models/postOutputModels"
import { postsQueryRepo } from "../repositories/postQueryRepo"
import { postService } from "../services/postService"
import { postQueryHelper } from "../utilities/postQueryHelper"
import{Request, Response} from "express"

export const getPostsById = async (req:Request<{id:string}>, res:Response<postPaginationModel | ErrorResponse>) => {
   
    try {
        const postsById = await postsQueryRepo.getPostsById(req.params.id, req.query)
        res.status(200).json(postsById)
    }
    catch(error) {
        if(error instanceof Error404) {
        res.sendStatus(404)
        } else {
        res.sendStatus(500)
        console.error(`Cannot fetch posts : ${(error as Error).message}`)
        }
    }
}