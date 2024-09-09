"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBlogController = void 0;
const blogService_1 = require("../services/blogService");
const blogQueryRepo_1 = require("../repositories/blogQueryRepo");
const createBlogController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = yield blogService_1.blogService.createBlog(req.body);
        const newBlog = yield blogQueryRepo_1.blogsQueryRepo.findBlog(blogId);
        if (newBlog)
            res.status(201).json(newBlog);
    }
    catch (error) {
        console.error(`Cannot create blog: ${error.message}`);
        res.sendStatus(500);
    }
});
exports.createBlogController = createBlogController;
