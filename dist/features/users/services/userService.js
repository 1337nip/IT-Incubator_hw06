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
exports.userService = void 0;
const sharedTypes_1 = require("../../../types/sharedTypes");
const userQueryRepo_1 = require("../repositories/userQueryRepo");
const userRepository_1 = require("../repositories/userRepository");
const checkUnique_1 = require("../utilities/checkUnique");
const passwordHashing_1 = require("../../../utilities/passwordHashing");
const mongodb_1 = require("mongodb");
exports.userService = {
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { login, password, email } = body;
            const uniqueError = yield (0, checkUnique_1.checkUnique)(login, email);
            if (uniqueError)
                return uniqueError;
            const newObjId = new mongodb_1.ObjectId;
            const passwordHash = yield (0, passwordHashing_1.hashPassword)(password);
            const newUser = {
                _id: newObjId,
                id: newObjId.toString(),
                login,
                passwordHash,
                email,
                createdAt: (new Date()).toISOString()
            };
            try {
                yield userRepository_1.userRepository.createUser(newUser);
                return newUser.id;
            }
            catch (error) {
                throw new Error(`Cannot create new user in repository: ${error.message}`);
            }
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield userQueryRepo_1.userQueryRepo.findUser(id);
            if (!result)
                throw new sharedTypes_1.Error404('Cannot find user to delete');
            try {
                yield userRepository_1.userRepository.deleteUser(id);
            }
            catch (error) {
                throw new Error(`(Service) Cannot delete user: ${error.message}`);
            }
        });
    }
};
