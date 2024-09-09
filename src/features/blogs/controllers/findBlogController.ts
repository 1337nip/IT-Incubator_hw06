import { Request, Response } from "express";
import { blogService } from "../services/blogService";
import { blogsQueryRepo } from "../repositories/blogQueryRepo";

export const findBlogController = async (req:Request<{id:string}>, res:Response) => {
    
    const blogFound = await blogsQueryRepo.findBlog(req.params.id)

    try {

        if(blogFound) {
            res.status(200).json(blogFound)
            return;
        } else {
            res.sendStatus(404)
            return;
        }
    }
    catch(error) {
        console.error('Error fetching blog by id', Error)
        res.status(500)
    }
}