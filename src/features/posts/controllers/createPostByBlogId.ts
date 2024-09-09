import { Request, Response } from "express";
import { postsViewModel } from "../models/postOutputModels";
import { Error404, ErrorResponse } from "../../../types/sharedTypes";
import { postCreateModel } from "../models/postInputModels";
import { postService } from "../services/postService";
import { postsQueryRepo } from "../repositories/postQueryRepo";

export const createPostById= async (req:Request<{id:string}, {}, postCreateModel>, res:Response<postsViewModel | ErrorResponse>) => {

    try {
        const postId = await postService.createPostByBlog(req.params.id, req.body)
        const newPost = await postsQueryRepo.findPost(postId as string)
        if(newPost)
        res.status(201).json(newPost)
    }
    catch(error) {
        if (error instanceof Error404) 
        res.sendStatus(404)
        else {
            console.error(`Cannot create post with blogid: ${(error as Error).message}`)
            res.sendStatus(500)
        }
    }
}
 
