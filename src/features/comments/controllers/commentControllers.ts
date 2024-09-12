import { Request, Response } from "express"
import { commentViewModel, commentPaginationModel } from "../models/commentModels"
import { commentService } from "../services/commentService"
import { commentQueryRepo } from "../repositories/commentQueryRepo"

export const commentController = {

    async createComment  (req:Request<{id:string}>, res:Response<commentViewModel>) {
        try {
            const result = await commentService.createComment(req.params.id, req.userId!, req.body.content)

            switch(result.statusCode) {
            case 4:
                res.sendStatus(404)
                return;
            case 3:
                res.sendStatus(403)
                return;
            case 0:
                if(result.data) {
                const comment = await commentQueryRepo.findComment(result.data)
                res.status(201).json(comment.data)
                } else {
                    throw new Error('CreateCommentController: Comment created, id received, but cannot fetch comment with this id from DB')
                }
            }
        }
        catch(error) {
            console.error(error)
            res.sendStatus(500)
        }
    },
 
    async findComment (req:Request<{id:string}>, res:Response<commentViewModel>){
        try {
        const result = await commentQueryRepo.findComment(req.params.id)
        switch(result.statusCode) {
            case 4:
                res.sendStatus(404)
                return;
            case 0:
                res.status(200).json(result.data)
                return;
            }
        }
        catch(error) {
            console.error(error)
            res.sendStatus(500)
        }
    },

    async deleteComment(req:Request<{id:string}>, res:Response){
        try {
        const result = await commentService.deleteComment(req.params.id, req.userId!)
        switch(result.statusCode) {
            case 4:
                res.sendStatus(404)
                return;
            case 3:
                res.sendStatus(403)
                return;
            case 0:
                res.sendStatus(204)
                return;
            }
        }
        catch (error) {
            console.error(error)
            res.sendStatus(500)
        }
    },

    //TODO CodeReview
    async getAllComments(req:Request<{id:string},{},{},{ [key:string] : string | undefined}>, res:Response<commentPaginationModel>) {
        try {
            const result = await commentQueryRepo.getAllComments(req.params.id, req.query)
            switch (result.statusCode) {
                case 4:
                    res.sendStatus(404)
                    return;
                case 0:
                    if(typeof result.data !== 'string' && result.data !==undefined ) { //TODO это TypeGuard
                    res.status(200).json(result.data)
                    return;
                    }  else 
                    throw new Error('GetAllComments controller: cannot get comments from QueryRepo')
                    }
                }
        catch(error) {
            console.error(error)
            res.sendStatus(500)
        }  
    },

    async updateComment(req:Request<{id:string}>, res:Response) {
        try {
            const result = await commentService.updateComment(req.params.id, req.userId!, req.body.content)
            switch(result.statusCode) {
                case 4:           
                    return res.sendStatus(404);
                case 3:
                    return res.sendStatus(403);
                case 0:
                    return res.sendStatus(204);
                }
            } 
        catch (error) {
            console.error(Error)
            return res.sendStatus(500)
        }
    }
}