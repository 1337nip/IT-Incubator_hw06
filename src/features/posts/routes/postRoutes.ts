import { Router } from "express";
import { getAllPostsController } from "../controllers/getAllPostsController";
import { findPostController } from "../controllers/findPostController";
import { deletePostController } from "../controllers/deletePostController";
import { createPostController } from "../controllers/createPostController";
import { updatePostController } from "../controllers/updatePostController";
import { requestAuthorization } from "../../../middlewares/authorizationMdw";
import { postInputValidator } from "../middlewares/postInputValidator";
import { returnValidationErrors } from "../../../middlewares/returnValidationMessages";
import { commentInputValidator } from "../../comments/middlewares/commentInputValidator";
import { authJWTmiddleware } from "../../../middlewares/authJWTmiddleware";
import { commentController } from "../../comments/controllers/commentControllers";
export const postsRouter = Router()

postsRouter.get('/', getAllPostsController)
postsRouter.get('/:id', findPostController)
postsRouter.delete('/:id', requestAuthorization, deletePostController)
postsRouter.post('/', requestAuthorization, postInputValidator, returnValidationErrors, createPostController)
postsRouter.put('/:id', requestAuthorization, postInputValidator, returnValidationErrors, updatePostController)
postsRouter.post('/:id/comments', authJWTmiddleware, commentInputValidator, returnValidationErrors, commentController.createComment)
postsRouter.get('/:id/comments', commentController.getAllComments)