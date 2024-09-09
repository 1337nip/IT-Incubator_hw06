
import{Request, Response} from "express"
import { postService } from "../services/postService"

export const deletePostController = async (req:Request, res:Response) => {
    try {
        await postService.deletePost(req.params.id)
        res.sendStatus(204)
    }
    catch(err) {
        res.sendStatus(404)
    }
}