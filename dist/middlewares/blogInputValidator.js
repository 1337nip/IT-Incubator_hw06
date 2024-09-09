"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogInputValidator = void 0;
const express_validator_1 = require("express-validator");
exports.blogInputValidator = [
    (0, express_validator_1.body)('name')
        .exists({ checkFalsy: true }).withMessage('Name required')
        .isString().withMessage('Must be a string')
        .trim()
        .isLength({ min: 1, max: 15 }).withMessage('Must be 1 to 15 characters'),
    (0, express_validator_1.body)('description')
        .exists({ checkFalsy: true }).withMessage('Description required')
        .isString().withMessage('Must be a string')
        .trim()
        .isLength({ min: 1, max: 100 }).withMessage('Must be 1 to 100 characters'),
    (0, express_validator_1.body)('websiteUrl')
        .exists({ checkFalsy: true }).withMessage('URL is required')
        .isString().withMessage('Must be a string')
        .trim()
        .isLength({ min: 1, max: 500 }).withMessage('Must be 1 to 500 characters')
        .isURL({ protocols: ['https'] }).withMessage('Example: https://google.com')
];
