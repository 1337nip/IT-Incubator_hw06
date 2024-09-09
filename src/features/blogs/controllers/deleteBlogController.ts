
import{Request, Response} from "express"
import { blogService } from "../services/blogService";

export const deleteBlogController = async (req:Request, res:Response) => {
    try {
        await blogService.deleteBlog(req.params.id)
        res.sendStatus(204)
    }
    catch(error) {
        res.sendStatus(404)
    }
}