"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnRequestErrors = void 0;
const express_validator_1 = require("express-validator");
const returnRequestErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorsFormatted = errors.array({ onlyFirstError: true }).map(e => {
            if ('path' in e) {
                return {
                    message: e.msg,
                    field: e.path
                };
            }
            else {
                return { msg: e.msg, path: 'unknown' };
            }
        });
        res.status(400).json({ errorsMessages: errorsFormatted });
        return;
    }
    next();
};
exports.returnRequestErrors = returnRequestErrors;
