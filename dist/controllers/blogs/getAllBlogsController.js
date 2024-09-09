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
exports.getAllBlogsController = void 0;
const blogsQueryRepo_1 = require("../../repositories/blogsQueryRepo");
const blogsQueryRepo_2 = require("../../repositories/blogsQueryRepo");
const getAllBlogsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const allBlogs = await blogsRepository.getAllBlogs()
    const processedQuery = (0, blogsQueryRepo_2.blogsQueryHelper)(req.query);
    const allBlogs = yield blogsQueryRepo_1.blogsQueryRepo.getMany(processedQuery);
    res.status(200).json(allBlogs);
});
exports.getAllBlogsController = getAllBlogsController;
