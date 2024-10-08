"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const getAllBlogsController_1 = require("../controllers/getAllBlogsController");
const findBlogController_1 = require("../controllers/findBlogController");
const deleteBlogController_1 = require("../controllers/deleteBlogController");
const createBlogController_1 = require("../controllers/createBlogController");
const updateBlogController_1 = require("../controllers/updateBlogController");
const authorizationMdw_1 = require("../../../middlewares/authorizationMdw");
const blogInputValidator_1 = require("../middlewares/blogInputValidator");
const returnValidationMessages_1 = require("../../../middlewares/returnValidationMessages");
const getPostsByBlogId_1 = require("../../posts/controllers/getPostsByBlogId");
const createPostByBlogId_1 = require("../../posts/controllers/createPostByBlogId");
const postByBlogInputValidator_1 = require("../../posts/middlewares/postByBlogInputValidator");
exports.blogsRouter = (0, express_1.Router)();
exports.blogsRouter.get('/', getAllBlogsController_1.getAllBlogsController);
exports.blogsRouter.get('/:id', findBlogController_1.findBlogController);
exports.blogsRouter.delete('/:id', authorizationMdw_1.requestAuthorization, deleteBlogController_1.deleteBlogController);
exports.blogsRouter.post('/', authorizationMdw_1.requestAuthorization, blogInputValidator_1.blogInputValidator, returnValidationMessages_1.returnValidationErrors, createBlogController_1.createBlogController);
exports.blogsRouter.put('/:id', authorizationMdw_1.requestAuthorization, blogInputValidator_1.blogInputValidator, returnValidationMessages_1.returnValidationErrors, updateBlogController_1.updateBlogController);
exports.blogsRouter.get('/:id/posts', getPostsByBlogId_1.getPostsById);
exports.blogsRouter.post('/:id/posts', authorizationMdw_1.requestAuthorization, postByBlogInputValidator_1.postByBlogInputValidator, returnValidationMessages_1.returnValidationErrors, createPostByBlogId_1.createPostById);
