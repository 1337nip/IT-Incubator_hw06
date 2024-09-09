
import { postsQueryRepo } from "../repositories/postQueryRepo"
import{Request, Response} from "express"

export const getAllPostsController = async (req:Request<{},{},{},{ [key:string] : string | undefined}>, res:Response) => {

    try {
    const allPosts = await postsQueryRepo.getAllPosts(req.query)
    res.status(200).json(allPosts)
    } 
    catch {
        console.error('Error fetching posts: ', Error)
        res.status(500)
    }
}
