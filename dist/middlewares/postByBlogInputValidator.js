"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postByBlogInputValidator = void 0;
const express_validator_1 = require("express-validator");
exports.postByBlogInputValidator = [
    (0, express_validator_1.body)('title')
        .trim()
        .exists({ checkFalsy: true }).withMessage('Title required')
        .isString().withMessage('Must be a string')
        .isLength({ min: 1, max: 30 }).withMessage('Must be 1 to 30 characters'),
    (0, express_validator_1.body)('shortDescription')
        .trim()
        .exists({ checkFalsy: true }).withMessage('Description required')
        .isString().withMessage('Must be a string')
        .isLength({ min: 1, max: 100 }).withMessage('Must be 1 to 100 characters'),
    (0, express_validator_1.body)('content')
        .trim()
        .exists({ checkFalsy: true }).withMessage('Content required')
        .isString().withMessage('Must be a string')
        .isLength({ min: 1, max: 1000 }).withMessage('Must be 1 to 1000 characters'),
];
