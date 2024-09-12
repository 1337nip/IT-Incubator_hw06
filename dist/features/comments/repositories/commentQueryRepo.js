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
exports.commentQueryRepo = void 0;
const sharedTypes_1 = require("../../../types/sharedTypes");
const mongo_db_1 = require("../../../db/mongo-db");
const commentQueryHelper_1 = require("../utilities/commentQueryHelper");
const pagesCount_1 = require("../../../utilities/others/pagesCount");
exports.commentQueryRepo = {
    findComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield mongo_db_1.commentCollection.findOne({ id });
            if (!comment)
                return {
                    statusCode: sharedTypes_1.StatusCode.NotFound,
                    errorMessage: 'Comment not found',
                };
            const commentOuput = {
                id: comment.id,
                content: comment.content,
                commentatorInfo: comment.commentatorInfo,
                createdAt: comment.createdAt
            };
            return {
                statusCode: sharedTypes_1.StatusCode.Success,
                data: commentOuput
            };
        });
    },
    getAllComments(postId, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongo_db_1.postsCollection.findOne({ id: postId });
            if (!result)
                return {
                    statusCode: sharedTypes_1.StatusCode.NotFound,
                    errorMessage: 'Post not found'
                };
            const processedQuery = (0, commentQueryHelper_1.commentQueryHelper)(query);
            const items = yield mongo_db_1.commentCollection
                .find({ postId: postId }, { projection: { _id: 0, postId: 0 } })
                .sort(processedQuery.sortBy, processedQuery.sortDirection)
                .skip((processedQuery.pageNumber - 1) * processedQuery.pageSize)
                .limit(processedQuery.pageSize)
                .toArray();
            const totalCount = yield mongo_db_1.commentCollection.countDocuments({ postId: postId });
            const pagesCount = (0, pagesCount_1.countPages)(totalCount, processedQuery.pageSize);
            return {
                statusCode: sharedTypes_1.StatusCode.Success,
                data: {
                    'pagesCount': pagesCount,
                    'page': processedQuery.pageNumber,
                    'pageSize': processedQuery.pageSize,
                    'totalCount': totalCount,
                    'items': items
                }
            };
        });
    }
};
