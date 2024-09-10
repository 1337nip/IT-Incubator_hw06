import { Router } from "express";
import { commentController } from "../controllers/commentControllers";
import { authJWTmiddleware } from "../../../middlewares/authJWTmiddleware";
import { commentInputValidator } from "../middlewares/commentInputValidator";
import { returnValidationErrors } from "../../../middlewares/returnValidationMessages";

export const commentRouter = Router()

commentRouter.get('/:id', commentController.findComment)
commentRouter.delete('/:id', authJWTmiddleware, commentController.deleteComment)
commentRouter.put('/:id', authJWTmiddleware, commentInputValidator, returnValidationErrors, commentController.updateComment)