import { Request, Response } from "express"
import { commentViewModel } from "../models/commentModels"
import { Error404 } from "../../../types/sharedTypes"
import { commentService } from "../services/commentService"
import { commentQueryRepo } from "../repositories/commentQueryRepo"

export const commentController = {

    async createComment  (req:Request<{id:string}>, res:Response<commentViewModel>) {
        try {
            const newCommentId = await commentService.createComment(req.params.id, req.userId!, req.body)
            const newCommentOuput = await commentQueryRepo.findComment(newCommentId)
            if(newCommentOuput)
            res.status(201).json(newCommentOuput)
        }
        catch(error) {
            if (error instanceof Error404)
            res.sendStatus(404)
            else {
            console.error(Error)
            res.sendStatus(500)
            }
        }
    }
}