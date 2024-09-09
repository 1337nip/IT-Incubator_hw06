import { Router } from "express";
import { getAllBlogsController } from "../controllers/getAllBlogsController";
import { findBlogController } from "../controllers/findBlogController";
import { deleteBlogController } from "../controllers/deleteBlogController";
import { createBlogController } from "../controllers/createBlogController";
import { updateBlogController } from "../controllers/updateBlogController";
import { requestAuthorization } from "../../../middlewares/authorizationMdw";
import { blogInputValidator } from "../middlewares/blogInputValidator";
import { returnValidationErrors } from "../../../middlewares/returnValidationMessages";
import { getPostsById } from "../../posts/controllers/getPostsByBlogId";
import { createPostById } from "../../posts/controllers/createPostByBlogId";
import { postInputValidator } from "../../posts/middlewares/postInputValidator";
import { postByBlogInputValidator } from "../../posts/middlewares/postByBlogInputValidator";

export const blogsRouter = Router()

blogsRouter.get('/', getAllBlogsController)
blogsRouter.get('/:id', findBlogController)
blogsRouter.delete('/:id', requestAuthorization, deleteBlogController)
blogsRouter.post('/', requestAuthorization, blogInputValidator, returnValidationErrors, createBlogController)
blogsRouter.put('/:id', requestAuthorization, blogInputValidator, returnValidationErrors,updateBlogController)
blogsRouter.get('/:id/posts', getPostsById)
blogsRouter.post('/:id/posts', requestAuthorization, postByBlogInputValidator, returnValidationErrors, createPostById)
