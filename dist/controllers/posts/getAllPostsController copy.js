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
exports.getAllPostsController = void 0;
const postsQueryRepo_1 = require("../../repositories/postsQueryRepo");
const getAllPostsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const allPosts = await postsRepository.getAllPosts()
    const processedQuery = (0, postsQueryRepo_1.postsQueryHelper)(req.query);
    const allPosts = yield postsQueryRepo_1.postsQueryRepo.getMany(processedQuery);
    res.status(200).json(allPosts);
});
exports.getAllPostsController = getAllPostsController;
