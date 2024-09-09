"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const getAllPostsController_1 = require("../controllers/posts/getAllPostsController");
exports.postsRouter = (0, express_1.Router)();
exports.postsRouter.get('/', getAllPostsController_1.getAllPostsController);
