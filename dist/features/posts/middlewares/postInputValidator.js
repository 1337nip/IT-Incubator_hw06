"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postInputValidator = void 0;
const express_validator_1 = require("express-validator");
const mongo_db_1 = require("../../../db/mongo-db");
exports.postInputValidator = [
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
    (0, express_validator_1.body)('blogId')
        .exists({ checkFalsy: true }).withMessage('Blog id required')
        .isString().withMessage('Must be a string')
        .trim()
        .isLength({ min: 1 }).withMessage('Length cannot be empty')
        .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let result = yield mongo_db_1.blogsCollection.findOne({ id: value });
            if (result === null) {
                return Promise.reject();
            }
            return true;
        }
        catch (error) {
            console.error('No blog with such id exists');
        }
    })).withMessage('No blog with such id exists')
];
