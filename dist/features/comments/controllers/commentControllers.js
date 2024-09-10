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
exports.commentController = void 0;
const sharedTypes_1 = require("../../../types/sharedTypes");
const commentService_1 = require("../services/commentService");
const commentQueryRepo_1 = require("../repositories/commentQueryRepo");
exports.commentController = {
    createComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCommentId = yield commentService_1.commentService.createComment(req.params.id, req.userId, req.body.content);
                const newCommentOuput = yield commentQueryRepo_1.commentQueryRepo.findComment(newCommentId);
                if (newCommentOuput)
                    res.status(201).json(newCommentOuput);
            }
            catch (error) {
                if (error instanceof sharedTypes_1.Error404)
                    res.sendStatus(404);
                else {
                    console.error(Error);
                    res.sendStatus(500);
                }
            }
        });
    },
    findComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentOutput = yield commentQueryRepo_1.commentQueryRepo.findComment(req.params.id);
            if (commentOutput === null) {
                res.sendStatus(404);
                return;
            }
            res.status(200).json(commentOutput);
            return;
        });
    },
    deleteComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield commentService_1.commentService.deleteComment(req.params.id, req.userId);
                if (result === null) {
                    res.sendStatus(404);
                    return;
                }
                if (result === false) {
                    res.sendStatus(403);
                    return;
                }
                res.sendStatus(204);
                return;
            }
            catch (error) {
                console.error(error.message);
            }
        });
    },
    getAllComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield commentQueryRepo_1.commentQueryRepo.getAllComments(req.params.id, req.query);
            if (result === null) {
                res.sendStatus(404);
                return;
            }
            res.status(200).json(result);
            return;
        });
    },
    updateComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield commentService_1.commentService.updateComment(req.params.id, req.userId, req.body.content);
                if (result === null)
                    res.sendStatus(404);
                if (result === false)
                    res.sendStatus(403);
                res.sendStatus(204);
                return;
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
};
