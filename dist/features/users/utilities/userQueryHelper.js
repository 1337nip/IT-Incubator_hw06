"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userQueryHelper = void 0;
const userQueryHelper = (query) => {
    return {
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection === 'asc' || query.sortDirection === 'desc' ? query.sortDirection : 'desc',
        searchLoginTerm: query.searchLoginTerm ? query.searchLoginTerm : null,
        searchEmailTerm: query.searchEmailTerm ? query.searchEmailTerm : null
    };
};
exports.userQueryHelper = userQueryHelper;
