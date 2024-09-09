import { Request, Response } from "express";
import { blogUpdateModel } from "../models/blogInputModels";
import { Error404, ErrorResponse } from "../../../types/sharedTypes";
import { blogService } from "../services/blogService";

export const updateBlogController = async (req:Request<{id:string},{},blogUpdateModel>, res:Response<void|ErrorResponse>) => {

    try {
        await blogService.updateBlog(req.params.id, req.body)
        res.sendStatus(204)
    }
    catch(error) {
        if(error instanceof Error404 ) {
        res.sendStatus(404)
        } else {
        res.sendStatus(500)
        console.error(`Cannot update blog: ${(error as Error).message}`)
        }
    }
}