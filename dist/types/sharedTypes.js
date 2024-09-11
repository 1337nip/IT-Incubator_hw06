"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCode = exports.Error404 = void 0;
class Error404 extends Error {
    constructor(message) {
        super(message);
        this.name = 'Error404';
    }
}
exports.Error404 = Error404;
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["NotFound"] = 4] = "NotFound";
    StatusCode[StatusCode["Forbidden"] = 3] = "Forbidden";
    StatusCode[StatusCode["Success"] = 0] = "Success";
})(StatusCode || (exports.StatusCode = StatusCode = {}));
