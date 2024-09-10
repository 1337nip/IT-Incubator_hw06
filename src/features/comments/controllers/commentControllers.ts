import { Request, Response } from "express"
import { commentViewModel, commentPaginationModel } from "../models/commentModels"
import { Error404 } from "../../../types/sharedTypes"
import { commentService } from "../services/commentService"
import { commentQueryRepo } from "../repositories/commentQueryRepo"
import { commentRepository } from "../repositories/commentRepository"


export const commentController = {

    async createComment  (req:Request<{id:string}>, res:Response<commentViewModel>) {
        try {
            const newCommentId = await commentService.createComment(req.params.id, req.userId!, req.body.content)
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
    },

    async findComment (req:Request<{id:string}>, res:Response<commentViewModel>){
        const commentOutput = await commentQueryRepo.findComment(req.params.id)
        if(commentOutput === null) {
        res.sendStatus(404)
        return; 
        }
        res.status(200).json(commentOutput)
        return;
    },

    async deleteComment(req:Request<{id:string}>, res:Response){
        try {
        const result = await commentService.deleteComment(req.params.id, req.userId!)
        if(result === null) {
            res.sendStatus(404)
            return;
            }
        if(result === false) {
            res.sendStatus(403)
            return;
        }
        res.sendStatus(204)
        return;
        }
        catch (error) {
            console.error((error as Error).message)
        }
    },

    async getAllComments(req:Request<{id:string},{},{},{ [key:string] : string | undefined}>, res:Response<commentPaginationModel>) {
        const result = await commentQueryRepo.getAllComments(req.params.id, req.query)
        res.status(200).json(result)
    },

    async updateComment(req:Request<{id:string}>, res:Response) {
        try {
        const result = await commentService.updateComment(req.params.id, req.userId!, req.body.content)
        if(result === null)
        res.sendStatus(404)
        if(result === false)
        res.sendStatus(403)

        res.sendStatus(204)
        return;
        }
        catch (error) {
            console.error((error as Error).message)
        }
    }
}