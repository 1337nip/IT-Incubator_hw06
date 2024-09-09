"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogQueryHelper = void 0;
const blogQueryHelper = (query) => {
    return {
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection : 'desc',
        searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null
    };
};
exports.blogQueryHelper = blogQueryHelper;
