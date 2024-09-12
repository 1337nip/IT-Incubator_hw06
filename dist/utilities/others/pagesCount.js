"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countPages = void 0;
const countPages = (totalCount, pageSize) => {
    return Math.ceil(totalCount / pageSize);
};
exports.countPages = countPages;
