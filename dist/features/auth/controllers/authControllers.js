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
exports.authControllers = void 0;
const authServices_1 = require("../services/authServices");
const userQueryRepo_1 = require("../../users/repositories/userQueryRepo");
exports.authControllers = {
    authLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield authServices_1.authService.login(req.body.loginOrEmail, req.body.password);
                if (result === false)
                    res.sendStatus(401);
                else if (result)
                    res.status(200).json({ "accessToken": result });
            }
            catch (error) {
                console.error(`Server fail when trying to login: ${error.message}`);
                res.sendStatus(500);
            }
        });
    },
    authMe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield userQueryRepo_1.userQueryRepo.findUserByToken(req.userId);
                res.status(200).json(result);
                return;
            }
            catch (error) {
                console.error(error);
                res.sendStatus(500);
            }
        });
    }
};
