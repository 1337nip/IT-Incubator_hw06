import { Request, Response } from "express";
import { postService } from "../services/postService";
import { postsQueryRepo } from "../repositories/postQueryRepo";
import { postsViewModel } from "../models/postOutputModels";
import { ErrorResponse } from "../../../types/sharedTypes";

export const findPostController = async (req:Request<{id:string}>, res:Response<postsViewModel|ErrorResponse>) => {
    
    try {
        const post = await postsQueryRepo.findPost(req.params.id)
        if(post){
            res.status(200).json(post)
            return;
        } else {
            res.sendStatus(404)
            return;
        }
    }
    catch(error) {
        console.error(`Cannot fetch post: ${(error as Error).message}`)
        res.sendStatus(500)
    }
}