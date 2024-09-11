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
exports.blogsQueryRepo = void 0;
const mongo_db_1 = require("../../../db/mongo-db");
const pagesCount_1 = require("../../../utilities/others/pagesCount");
const blogQueryHelper_1 = require("../utilities/blogQueryHelper");
exports.blogsQueryRepo = {
    getAllBlogs(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const processedQuery = (0, blogQueryHelper_1.blogQueryHelper)(query);
            const filter = processedQuery.searchNameTerm ? { name: new RegExp(processedQuery.searchNameTerm, 'i') } : {};
            const allBlogs = yield mongo_db_1.blogsCollection
                .find(filter, { projection: { _id: 0 } })
                .sort(processedQuery.sortBy, processedQuery.sortDirection)
                .skip((processedQuery.pageNumber - 1) * processedQuery.pageSize)
                .limit(processedQuery.pageSize)
                .toArray();
            const totalCount = yield mongo_db_1.blogsCollection.countDocuments(filter);
            const pagesCount = (0, pagesCount_1.countPages)(totalCount, processedQuery.pageSize);
            return {
                "pagesCount": pagesCount,
                "page": processedQuery.pageNumber,
                "pageSize": processedQuery.pageSize,
                "totalCount": totalCount,
                "items": allBlogs
            };
        });
    },
    findBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield mongo_db_1.blogsCollection.findOne({ id });
            if (!blog)
                return null;
            const blogOutput = {
                id: blog.id,
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: blog.createdAt,
                isMembership: blog.isMembership
            };
            return blogOutput;
        });
    }
};
