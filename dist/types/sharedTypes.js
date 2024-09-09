"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error404 = void 0;
class Error404 extends Error {
    constructor(message) {
        super(message);
        this.name = 'Error404';
    }
}
exports.Error404 = Error404;
