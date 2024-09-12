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
exports.postService = void 0;
const postRepository_1 = require("../repositories/postRepository");
const mongo_db_1 = require("../../../db/mongo-db");
const mongo_db_2 = require("../../../db/mongo-db");
const sharedTypes_1 = require("../../../types/sharedTypes");
const mongodb_1 = require("mongodb");
exports.postService = {
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield postRepository_1.postsRepository.deletePost(id);
            }
            catch (_a) {
                throw new Error('Post not found');
            }
        });
    },
    createPost(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, shortDescription, content, blogId } = body;
            let blogName;
            const blog = yield mongo_db_2.blogsCollection.findOne({ id: blogId });
            if (blog) {
                blogName = blog.name;
            }
            else {
                throw new sharedTypes_1.Error404('No blog with such id is found');
            }
            const newObjId = new mongodb_1.ObjectId;
            const newPost = {
                _id: newObjId,
                id: newObjId.toString(),
                title,
                shortDescription,
                content,
                blogId,
                blogName,
                createdAt: (new Date()).toISOString(),
            };
            try {
                yield postRepository_1.postsRepository.createPost(newPost);
                return newPost.id;
            }
            catch (error) {
                throw new Error(`Cannot create new post in service: ${error.message}`);
            }
        });
    },
    updatePost(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongo_db_1.postsCollection.findOne({ id });
            if (result === null) {
                throw new sharedTypes_1.Error404('Cannot find post to update');
            }
            try {
                yield postRepository_1.postsRepository.updatePost(id, body);
            }
            catch (error) {
                throw new Error(`Cannot update post: ${error.message}`);
            }
        });
    },
    createPostByBlog(blogId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield mongo_db_2.blogsCollection.findOne({ id: blogId });
            if (blog === null) {
                throw new sharedTypes_1.Error404('No blog with this id is found');
            }
            const { title, shortDescription, content } = body;
            const blogName = blog.name;
            const newObjId = new mongodb_1.ObjectId;
            const newPost = {
                _id: newObjId,
                id: newObjId.toString(),
                title,
                shortDescription,
                content,
                blogId,
                blogName,
                createdAt: (new Date()).toISOString(),
            };
            try {
                yield postRepository_1.postsRepository.createPostByBlog(newPost);
                return newPost.id;
            }
            catch (error) {
                throw new Error(`Cannot create new post with blog id in service: ${error.message}`);
            }
        });
    }
};
