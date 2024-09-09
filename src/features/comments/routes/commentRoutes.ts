import { Router } from "express";
import { commentController } from "../controllers/commentControllers";

export const commentRouter = Router()

commentRouter.get('/:id', commentController.findComment)