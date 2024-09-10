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
exports.commentService = {
    createComment(postId, userId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkPost = yield mongo_db_1.postsCollection.findOne({ id: postId });
            if (checkPost === null)
                throw new sharedTypes_1.Error404('Post with this id does not exist');
            let id;
            const newest = yield mongo_db_1.commentCollection.findOne({}, { sort: { _id: -1 } });
            if (newest) {
                id = (Number(newest.id) + 1).toString();
            }
            else {
                id = "1";
            }
            const user = yield mongo_db_1.userCollection.findOne({ id: userId });
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
            return id;
        });
    },
    deleteComment(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkComment = yield commentRepository_1.commentRepository.findComment(id);
            if (checkComment === null) {
                return null;
            }
            if (checkComment.commentatorInfo.userId !== userId)
                return false;
            try {
                yield commentRepository_1.commentRepository.deleteComment(id);
            }
            catch (error) {
                console.error(error.message);
            }
            return true;
        });
    },
    updateComment(id, userId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield commentRepository_1.commentRepository.findComment(id);
            if (result === null)
                return null;
            if (result.commentatorInfo.userId !== userId)
                return false;
            try {
                yield commentRepository_1.commentRepository.updateComment(id, content);
            }
            catch (error) {
                console.error(error.message);
            }
            return true;
        });
    }
};
