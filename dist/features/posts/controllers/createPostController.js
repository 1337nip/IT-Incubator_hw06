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
exports.createPostController = void 0;
const postService_1 = require("../services/postService");
const sharedTypes_1 = require("../../../types/sharedTypes");
const postQueryRepo_1 = require("../repositories/postQueryRepo");
const createPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = yield postService_1.postService.createPost(req.body);
        const newPost = yield postQueryRepo_1.postsQueryRepo.findPost(postId);
        if (newPost)
            res.status(201).json(newPost);
    }
    catch (error) {
        if (error instanceof sharedTypes_1.Error404)
            res.sendStatus(404);
        else {
            console.error(`Cannot create post: ${error.message}`);
            res.sendStatus(500);
        }
    }
});
exports.createPostController = createPostController;
