"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const getAllPostsController_1 = require("../controllers/getAllPostsController");
const findPostController_1 = require("../controllers/findPostController");
const deletePostController_1 = require("../controllers/deletePostController");
const createPostController_1 = require("../controllers/createPostController");
const updatePostController_1 = require("../controllers/updatePostController");
const authorizationMdw_1 = require("../../../middlewares/authorizationMdw");
const postInputValidator_1 = require("../middlewares/postInputValidator");
const returnValidationMessages_1 = require("../../../middlewares/returnValidationMessages");
const commentInputValidator_1 = require("../../comments/middlewares/commentInputValidator");
const authJWTmiddleware_1 = require("../../../middlewares/authJWTmiddleware");
const commentControllers_1 = require("../../comments/controllers/commentControllers");
exports.postsRouter = (0, express_1.Router)();
exports.postsRouter.get('/', getAllPostsController_1.getAllPostsController);
exports.postsRouter.get('/:id', findPostController_1.findPostController);
exports.postsRouter.delete('/:id', authorizationMdw_1.requestAuthorization, deletePostController_1.deletePostController);
exports.postsRouter.post('/', authorizationMdw_1.requestAuthorization, postInputValidator_1.postInputValidator, returnValidationMessages_1.returnValidationErrors, createPostController_1.createPostController);
exports.postsRouter.put('/:id', authorizationMdw_1.requestAuthorization, postInputValidator_1.postInputValidator, returnValidationMessages_1.returnValidationErrors, updatePostController_1.updatePostController);
exports.postsRouter.post('/:id/comments', authJWTmiddleware_1.authJWTmiddleware, commentInputValidator_1.commentInputValidator, returnValidationMessages_1.returnValidationErrors, commentControllers_1.commentController.createComment);
exports.postsRouter.get('/:id/comments', commentControllers_1.commentController.getAllComments);
