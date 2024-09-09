import { Router } from "express";
import { getAllPostsController } from "../controllers/getAllPostsController";
import { findPostController } from "../controllers/findPostController";
import { deletePostController } from "../controllers/deletePostController";
import { createPostController } from "../controllers/createPostController";
import { updatePostController } from "../controllers/updatePostController";
import { requestAuthorization } from "../../../middlewares/authorizationMdw";
import { postInputValidator } from "../middlewares/postInputValidator";
import { returnValidationErrors } from "../../../middlewares/returnValidationMessages";
import { getPostsById } from "../controllers/getPostsByBlogId";
export const postsRouter = Router()

postsRouter.get('/', getAllPostsController)
postsRouter.get('/:id', findPostController)
postsRouter.delete('/:id', requestAuthorization, deletePostController)
postsRouter.post('/', requestAuthorization, postInputValidator, returnValidationErrors, createPostController)
postsRouter.put('/:id', requestAuthorization, postInputValidator, returnValidationErrors, updatePostController)
