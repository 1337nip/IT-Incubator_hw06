"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authControllers_1 = require("../controllers/authControllers");
const loginInputValidator_1 = require("../middlewares/loginInputValidator");
const returnValidationMessages_1 = require("../../../middlewares/returnValidationMessages");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/login', loginInputValidator_1.loginInputValidator, returnValidationMessages_1.returnValidationErrors, authControllers_1.authControllers.authLogin);
