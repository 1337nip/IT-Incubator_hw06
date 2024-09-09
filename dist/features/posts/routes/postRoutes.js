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
exports.postsRouter = (0, express_1.Router)();
exports.postsRouter.get('/', getAllPostsController_1.getAllPostsController);
exports.postsRouter.get('/:id', findPostController_1.findPostController);
exports.postsRouter.delete('/:id', authorizationMdw_1.requestAuthorization, deletePostController_1.deletePostController);
exports.postsRouter.post('/', authorizationMdw_1.requestAuthorization, postInputValidator_1.postInputValidator, returnValidationMessages_1.returnValidationErrors, createPostController_1.createPostController);
exports.postsRouter.put('/:id', authorizationMdw_1.requestAuthorization, postInputValidator_1.postInputValidator, returnValidationMessages_1.returnValidationErrors, updatePostController_1.updatePostController);
