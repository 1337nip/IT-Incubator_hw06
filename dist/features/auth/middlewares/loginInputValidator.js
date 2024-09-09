"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginInputValidator = void 0;
const express_validator_1 = require("express-validator");
exports.loginInputValidator = [
    (0, express_validator_1.body)('loginOrEmail')
        .exists({ checkFalsy: true }).withMessage('Login required')
        .isString().withMessage('Must be a string'),
    (0, express_validator_1.body)('password')
        .exists({ checkFalsy: true }).withMessage('Password required')
        .isString().withMessage('Must be a string')
];
