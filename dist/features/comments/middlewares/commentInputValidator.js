"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentInputValidator = void 0;
const express_validator_1 = require("express-validator");
exports.commentInputValidator = [
    (0, express_validator_1.body)('content')
        .exists({ checkFalsy: true }).withMessage('Content required')
        .isString().withMessage('Must be a string')
        .trim()
        .isLength({ min: 20, max: 300 }).withMessage('Must be 20 to 300 characters')
];
