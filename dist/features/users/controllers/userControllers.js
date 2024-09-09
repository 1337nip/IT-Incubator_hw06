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
exports.userControllers = void 0;
const userService_1 = require("../services/userService");
const sharedTypes_1 = require("../../../types/sharedTypes");
const userQueryRepo_1 = require("../repositories/userQueryRepo");
exports.userControllers = {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield userService_1.userService.createUser(req.body);
                if (typeof result === 'object')
                    res.status(400).json(result);
                else {
                    const user = yield userQueryRepo_1.userQueryRepo.findUser(result);
                    if (user)
                        res.status(201).json(user);
                }
            }
            catch (error) {
                console.error(`Cannot create user in service: ${error.message}`);
                res.sendStatus(500);
            }
        });
    },
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userQueryRepo_1.userQueryRepo.getUsers(req.query);
                res.status(200).json(users);
            }
            catch (error) {
                console.error(`(Controller)Cannot fetch users: ${error.message}`);
                res.sendStatus(500);
            }
        });
    },
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userService_1.userService.deleteUser(req.params.id);
                res.sendStatus(204);
            }
            catch (error) {
                if (error instanceof sharedTypes_1.Error404)
                    res.sendStatus(404);
                else {
                    console.error(`Cannot delete user: ${error.message}`);
                    res.sendStatus(500);
                }
            }
        });
    }
};
