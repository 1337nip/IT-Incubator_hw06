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
exports.deleteBlogController = void 0;
const blogService_1 = require("../services/blogService");
const deleteBlogController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield blogService_1.blogService.deleteBlog(req.params.id);
        res.sendStatus(204);
    }
    catch (error) {
        res.sendStatus(404);
    }
});
exports.deleteBlogController = deleteBlogController;
