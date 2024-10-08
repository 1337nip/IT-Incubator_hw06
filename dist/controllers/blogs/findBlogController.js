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
exports.findBlogController = void 0;
const blogsRepository_1 = require("../../repositories/blogsRepository");
const findBlogController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogFound = yield blogsRepository_1.blogsRepository.findBlog(req.params.id);
    if (blogFound) {
        res.status(200).json(blogFound);
        return;
    }
    else {
        res.sendStatus(404);
        return;
    }
});
exports.findBlogController = findBlogController;
