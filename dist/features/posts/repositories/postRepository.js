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
exports.postsRepository = void 0;
const mongo_db_1 = require("../../../db/mongo-db");
exports.postsRepository = {
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_db_1.postsCollection.find({}, { projection: { _id: 0 } }).toArray();
        });
    },
    deletePost(passedID) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongo_db_1.postsCollection.deleteOne({ id: passedID });
            if (result.deletedCount === 0) {
                throw new Error('Not found');
            }
        });
    },
    createPost(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongo_db_1.postsCollection.insertOne(newPost);
                return newPost.id;
            }
            catch (error) {
                throw new Error(`Cannot create new blog in repository: ${error.message}`);
            }
        });
    },
    updatePost(passedID, passedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, shortDescription, content, blogId } = passedData;
            const result = yield mongo_db_1.postsCollection.updateOne({ id: passedID }, { $set: { title, shortDescription, content, blogId } });
            if (result.matchedCount === 0) {
                throw new Error("Cannot update post in repository");
            }
        });
    },
    createPostByBlog(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongo_db_1.postsCollection.insertOne(newPost);
            }
            catch (error) {
                throw new Error(`Cannot create new post with blog id in repository: ${error.message}`);
            }
        });
    },
    findPost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mongo_db_1.postsCollection.findOne({ id: postId });
        });
    }
};
