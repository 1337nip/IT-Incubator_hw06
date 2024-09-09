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
                const newCommentId = yield commentService_1.commentService.createComment(req.params.id, req.userId, req.body);
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
    }
};
