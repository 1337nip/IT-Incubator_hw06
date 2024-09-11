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
exports.commentService = void 0;
const sharedTypes_1 = require("../../../types/sharedTypes");
const mongo_db_1 = require("../../../db/mongo-db");
const commentRepository_1 = require("../repositories/commentRepository");
const postRepository_1 = require("../../posts/repositories/postRepository");
exports.commentService = {
    createComment(postId, userId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkPost = yield postRepository_1.postsRepository.findPost(postId);
            if (!checkPost)
                return {
                    statusCode: sharedTypes_1.StatusCode.NotFound,
                    errorMessage: 'Post not found',
                };
            let id;
            const newest = yield mongo_db_1.commentCollection.findOne({}, { sort: { _id: -1 } }); //TODO тут не должно быть запроса напрямую в БД, тут и своего айди не должно быть
            if (newest) {
                id = (Number(newest.id) + 1).toString();
            }
            else {
                id = "1";
            }
            //TODO typeGuard?
            //TODO реализовать throw new {}
            const user = yield mongo_db_1.userCollection.findOne({ id: userId }); //TODO тут точно не должно быть запроса в БД
            const newComment = {
                id: id,
                postId: postId,
                content: content,
                commentatorInfo: {
                    userId: userId,
                    userLogin: user.login
                },
                createdAt: (new Date()).toISOString()
            };
            yield commentRepository_1.commentRepository.createComment(newComment);
            return {
                statusCode: sharedTypes_1.StatusCode.Success,
                data: id
            };
        });
    },
    deleteComment(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkComment = yield commentRepository_1.commentRepository.findComment(id);
            if (!checkComment)
                return {
                    statusCode: sharedTypes_1.StatusCode.NotFound,
                    errorMessage: 'Comment not found'
                };
            if (checkComment.commentatorInfo.userId !== userId)
                return {
                    statusCode: sharedTypes_1.StatusCode.Forbidden,
                    errorMessage: 'This user is not allowed to change this comment'
                };
            yield commentRepository_1.commentRepository.deleteComment(id);
            return {
                statusCode: sharedTypes_1.StatusCode.Success
            };
        });
    },
    updateComment(id, userId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield commentRepository_1.commentRepository.findComment(id);
            if (!result)
                return {
                    statusCode: sharedTypes_1.StatusCode.NotFound,
                    errorMessage: 'Cannot find comment'
                };
            if (result.commentatorInfo.userId !== userId)
                return {
                    statusCode: sharedTypes_1.StatusCode.Forbidden,
                    errorMessage: 'This user is not allowed to change this comment'
                };
            yield commentRepository_1.commentRepository.updateComment(id, content);
            return {
                statusCode: sharedTypes_1.StatusCode.Success
            };
        });
    }
};
