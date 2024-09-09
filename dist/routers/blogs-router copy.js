"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const getAllBlogsController_1 = require("../controllers/blogs/getAllBlogsController");
exports.blogsRouter = (0, express_1.Router)();
exports.blogsRouter.get('/', getAllBlogsController_1.getAllBlogsController);
