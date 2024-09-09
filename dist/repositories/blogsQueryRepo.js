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
exports.blogsQueryRepo = exports.blogsQueryHelper = void 0;
const mongo_db_1 = require("../db/mongo-db");
const blogsQueryHelper = (query) => {
    return {
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection : 'desc',
        searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null
    };
};
exports.blogsQueryHelper = blogsQueryHelper;
exports.blogsQueryRepo = {
    getMany(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = query.searchNameTerm ? { name: new RegExp(query.searchNameTerm, 'i') } : {};
            const allBlogs = yield mongo_db_1.blogsCollection
                .find(filter, { projection: { _id: 0 } })
                .sort(query.sortBy, query.sortDirection)
                .skip((query.pageNumber - 1) * query.pageSize)
                .limit(query.pageSize)
                .toArray();
            const totalCount = yield mongo_db_1.blogsCollection.countDocuments(filter);
            const pagesCount = Math.ceil(totalCount / query.pageSize);
            return {
                "pagesCount": pagesCount,
                "page": query.pageNumber,
                "pageSize": query.pageSize,
                "totalCount": totalCount,
                "items": allBlogs
            };
        });
    },
};
