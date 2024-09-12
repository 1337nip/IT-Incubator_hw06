import { Request, Response } from "express";
import { blogService } from "../services/blogService";
import { blogCreateModel } from "../models/blogInputModels";
import { blogsViewModel } from "../models/blogOutputModels";
import { blogsQueryRepo } from "../repositories/blogQueryRepo";


export const createBlogController = async (req:Request<{},{},blogCreateModel>, res:Response<blogsViewModel>) => {
    
    try {
        const blogId = await blogService.createBlog(req.body)
        const newBlog = await blogsQueryRepo.findBlog(blogId)
        if(newBlog)
        res.status(201).json(newBlog)
        }
    
    catch(error) {
        console.error(`Cannot create blog: ${(error as Error).message}`)
        res.sendStatus(500)
    }
}