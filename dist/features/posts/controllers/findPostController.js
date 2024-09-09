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
exports.findPostController = void 0;
const postQueryRepo_1 = require("../repositories/postQueryRepo");
const findPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield postQueryRepo_1.postsQueryRepo.findPost(req.params.id);
        if (post) {
            res.status(200).json(post);
            return;
        }
        else {
            res.sendStatus(404);
            return;
        }
    }
    catch (error) {
        console.error(`Cannot fetch post: ${error.message}`);
        res.sendStatus(500);
    }
});
exports.findPostController = findPostController;
