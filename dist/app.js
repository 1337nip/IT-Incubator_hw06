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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const blogRoutes_1 = require("./features/blogs/routes/blogRoutes");
const postRoutes_1 = require("./features/posts/routes/postRoutes");
const settings_1 = require("./settings");
const mongo_db_1 = require("./db/mongo-db");
const userRoutes_1 = require("./features/users/routes/userRoutes");
const authRoutes_1 = require("./features/auth/routes/authRoutes");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(settings_1.SETTINGS.PATH.BLOGS, blogRoutes_1.blogsRouter);
exports.app.use(settings_1.SETTINGS.PATH.POSTS, postRoutes_1.postsRouter);
exports.app.use(settings_1.SETTINGS.PATH.USERS, userRoutes_1.userRouter);
exports.app.use(settings_1.SETTINGS.PATH.AUTH, authRoutes_1.authRouter);
exports.app.delete('/testing/all-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongo_db_1.eraseDB)();
    res.sendStatus(204);
}));
