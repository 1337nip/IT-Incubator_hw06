import{Request, Response} from "express"
import { blogQueryHelper } from "../utilities/blogQueryHelper";
import { blogService } from "../services/blogService";
import { blogsQueryRepo } from "../repositories/blogQueryRepo";

export const getAllBlogsController = async (req:Request<{},{},{},{[key: string]: string | undefined}>, res:Response) => {
    
    try {
    const allBlogs = await blogsQueryRepo.getAllBlogs(req.query)
    res.status(200).json(allBlogs)
    }
    catch (e) {
        console.error('Error fetching blogs:', Error)
        res.sendStatus(500)
    }

}

