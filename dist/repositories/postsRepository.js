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
const mongo_db_1 = require("../db/mongo-db");
exports.postsRepository = {
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_db_1.postsCollection.find({}, { projection: { _id: 0 } }).toArray();
        });
    },
    findPost(passedID) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_db_1.postsCollection.findOne({ id: passedID }, { projection: { _id: 0 } });
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
    createPost(passedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, shortDescription, content, blogId } = passedData;
            const newest = yield mongo_db_1.postsCollection.findOne({}, { sort: { _id: -1 } });
            let newID;
            if (newest) {
                newID = (Number(newest.id) + 1).toString();
            }
            else {
                newID = "1";
            }
            let blogName;
            const blog = yield mongo_db_1.blogsCollection.findOne({ id: blogId });
            if (blog) {
                blogName = blog.name;
            }
            else {
                blogName = 'undefined';
                console.error('Blog name is undefined');
            }
            const newPost = {
                id: newID,
                title,
                shortDescription,
                content,
                blogId,
                blogName,
                createdAt: (new Date()).toISOString(),
            };
            const newPostOutput = structuredClone(newPost);
            yield mongo_db_1.postsCollection.insertOne(newPost);
            return (newPostOutput);
        });
    },
    updatePost(passedID, passedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, shortDescription, content, blogId } = passedData;
            const result = yield mongo_db_1.postsCollection.updateOne({ id: passedID }, { $set: { title, shortDescription, content, blogId } });
            if (result.matchedCount === 0) {
                throw new Error("Document for a post update is not found");
            }
        });
    },
    createPostById(passedID, passedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, shortDescription, content } = passedData;
            const blogId = passedID;
            let result = yield mongo_db_1.blogsCollection.findOne({ id: blogId });
            if (!result) {
                throw new Error('No blog found');
            }
            const newest = yield mongo_db_1.postsCollection.findOne({}, { sort: { _id: -1 } });
            let newID;
            if (newest) {
                newID = (Number(newest.id) + 1).toString();
            }
            else {
                newID = "1";
            }
            let blogName;
            const blog = yield mongo_db_1.blogsCollection.findOne({ id: blogId });
            if (blog) {
                blogName = blog.name;
            }
            else {
                blogName = 'undefined';
                console.error('Blog name is undefined');
            }
            const newPost = {
                id: newID,
                title,
                shortDescription,
                content,
                blogId,
                blogName,
                createdAt: (new Date()).toISOString(),
            };
            const newPostOutput = structuredClone(newPost);
            yield mongo_db_1.postsCollection.insertOne(newPost);
            console.log(newPostOutput);
            return (newPostOutput);
        });
    }
};
