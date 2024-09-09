import { Request, Response } from "express";
import { postCreateModel } from "../models/postInputModels";
import { postsViewModel } from "../models/postOutputModels";
import { postService } from "../services/postService";
import { Error404, ErrorResponse } from "../../../types/sharedTypes";
import { postsQueryRepo } from "../repositories/postQueryRepo";

export const createPostController = async (req:Request<{}, {}, postCreateModel>, res:Response<postsViewModel | ErrorResponse>) => {
    
    try {
        const postId = await postService.createPost(req.body)
        const newPost = await postsQueryRepo.findPost(postId as string)
        if(newPost) 
            res.status(201).json(newPost)
        }

    catch (error) {
        if (error instanceof Error404)
        res.sendStatus(404)
        else {
        console.error(`Cannot create post: ${(error as Error).message}`)
        res.sendStatus(500)
        }
    }
}
