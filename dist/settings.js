"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SETTINGS = void 0;
exports.SETTINGS = {
    PORT: process.env.PORT || 3333,
    PATH: {
        BLOGS: '/blogs',
        POSTS: '/posts',
        USERS: '/users',
        AUTH: '/auth',
        COMMENTS: '/comments'
    },
    JWT: {
        SECRET: process.env.JWT_SECRET || 'HQqTu^kn2RNAbDCV*C=nqa^mU)'
    }
};
