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
const blogQueryRepo_1 = require("../repositories/blogQueryRepo");
const getAllBlogsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBlogs = yield blogQueryRepo_1.blogsQueryRepo.getAllBlogs(req.query);
        res.status(200).json(allBlogs);
    }
    catch (e) {
        console.error('Error fetching blogs:', Error);
        res.sendStatus(500);
    }
});
exports.getAllBlogsController = getAllBlogsController;
