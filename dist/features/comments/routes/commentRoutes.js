"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = require("express");
const commentControllers_1 = require("../controllers/commentControllers");
exports.commentRouter = (0, express_1.Router)();
exports.commentRouter.get('/:id', commentControllers_1.commentController.findComment);
