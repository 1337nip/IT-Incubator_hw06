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
exports.updatePostController = void 0;
const postService_1 = require("../services/postService");
const sharedTypes_1 = require("../../../types/sharedTypes");
const updatePostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield postService_1.postService.updatePost(req.params.id, req.body);
        res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof sharedTypes_1.Error404) {
            res.sendStatus(404);
        }
        else {
            res.sendStatus(500);
            console.error(`Cannot update post: ${error.message}`);
        }
    }
});
exports.updatePostController = updatePostController;
