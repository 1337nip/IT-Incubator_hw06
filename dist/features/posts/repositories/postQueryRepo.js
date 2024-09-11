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
exports.postsQueryRepo = void 0;
const mongo_db_1 = require("../../../db/mongo-db");
const postQueryHelper_1 = require("../utilities/postQueryHelper");
const mongo_db_2 = require("../../../db/mongo-db");
const sharedTypes_1 = require("../../../types/sharedTypes");
const pagesCount_1 = require("../../../utilities/others/pagesCount");
exports.postsQueryRepo = {
    getAllPosts(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const processedQuery = (0, postQueryHelper_1.postQueryHelper)(query);
            const allPosts = yield mongo_db_1.postsCollection
                .find({}, { projection: { _id: 0 } })
                .sort(processedQuery.sortBy, processedQuery.sortDirection)
                .skip((processedQuery.pageNumber - 1) * processedQuery.pageSize)
                .limit(processedQuery.pageSize)
                .toArray();
            const totalCount = yield mongo_db_1.postsCollection.countDocuments();
            const pagesCount = (0, pagesCount_1.countPages)(totalCount, processedQuery.pageSize);
            return {
                "pagesCount": pagesCount,
                "page": processedQuery.pageNumber,
                "pageSize": processedQuery.pageSize,
                "totalCount": totalCount,
                "items": allPosts
            };
        });
    },
    getPostsById(passedID, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongo_db_2.blogsCollection.findOne({ id: passedID });
            if (result === null)
                throw new sharedTypes_1.Error404('Cannot find blog with this id');
            const processedQuery = (0, postQueryHelper_1.postQueryHelper)(query);
            const filter = { blogId: passedID };
            const posts = yield mongo_db_1.postsCollection
                .find(filter, { projection: { _id: 0 } })
                .sort(processedQuery.sortBy, processedQuery.sortDirection)
                .skip((processedQuery.pageNumber - 1) * processedQuery.pageSize)
                .limit(processedQuery.pageSize)
                .toArray();
            const totalCount = yield mongo_db_1.postsCollection.countDocuments({ blogId: passedID });
            const pagesCount = Math.ceil(totalCount / processedQuery.pageSize);
            return {
                "pagesCount": pagesCount,
                "page": processedQuery.pageNumber,
                "pageSize": processedQuery.pageSize,
                "totalCount": totalCount,
                "items": posts
            };
        });
    },
    findPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield mongo_db_1.postsCollection.findOne({ id });
            if (!post)
                return null;
            const postOutput = {
                id: post.id,
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt
            };
            return postOutput;
        });
    },
};
