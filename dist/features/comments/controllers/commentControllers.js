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
const commentService_1 = require("../services/commentService");
const commentQueryRepo_1 = require("../repositories/commentQueryRepo");
exports.commentController = {
    createComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield commentService_1.commentService.createComment(req.params.id, req.userId, req.body.content);
                switch (result.statusCode) {
                    case 4:
                        res.sendStatus(404);
                        return;
                    case 3:
                        res.sendStatus(403);
                        return;
                    case 0:
                        if (result.data) {
                            const comment = yield commentQueryRepo_1.commentQueryRepo.findComment(result.data);
                            res.status(201).json(comment.data);
                        }
                        else {
                            throw new Error('CreateCommentController: Comment created, id received, but cannot fetch comment with this id from DB');
                        }
                }
            }
            catch (error) {
                console.error(error);
                res.sendStatus(500);
            }
        });
    },
    findComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield commentQueryRepo_1.commentQueryRepo.findComment(req.params.id);
                switch (result.statusCode) {
                    case 4:
                        res.sendStatus(404);
                        return;
                    case 0:
                        res.status(200).json(result.data);
                        return;
                }
            }
            catch (error) {
                console.error(error);
                res.sendStatus(500);
            }
        });
    },
    deleteComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield commentService_1.commentService.deleteComment(req.params.id, req.userId);
                switch (result.statusCode) {
                    case 4:
                        res.sendStatus(404);
                        return;
                    case 3:
                        res.sendStatus(403);
                        return;
                    case 0:
                        res.sendStatus(204);
                        return;
                }
            }
            catch (error) {
                console.error(error);
                res.sendStatus(500);
            }
        });
    },
    //TODO CodeReview
    getAllComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield commentQueryRepo_1.commentQueryRepo.getAllComments(req.params.id, req.query);
                switch (result.statusCode) {
                    case 4:
                        res.sendStatus(404);
                        return;
                    case 0:
                        if (typeof result.data !== 'string' && result.data !== undefined) { //TODO это TypeGuard
                            res.status(200).json(result.data);
                            return;
                        }
                        else
                            throw new Error('GetAllComments controller: cannot get comments from QueryRepo');
                }
            }
            catch (error) {
                console.error(error);
                res.sendStatus(500);
            }
        });
    },
    updateComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield commentService_1.commentService.updateComment(req.params.id, req.userId, req.body.content);
                switch (result.statusCode) {
                    case 4:
                        return res.sendStatus(404);
                    case 3:
                        return res.sendStatus(403);
                    case 0:
                        return res.sendStatus(204);
                }
            }
            catch (error) {
                console.error(Error);
                return res.sendStatus(500);
            }
        });
    }
};
