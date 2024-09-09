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
const mongo_db_1 = require("../../../db/mongo-db");
const sharedTypes_1 = require("../../../types/sharedTypes");
const userQueryRepo_1 = require("../repositories/userQueryRepo");
const userRepository_1 = require("../repositories/userRepository");
const checkUnique_1 = require("../utilities/checkUnique");
const passwordHashing_1 = require("../../../utilities/passwordHashing");
exports.userService = {
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { login, password, email } = body;
            const uniqueError = yield (0, checkUnique_1.checkUnique)(login, email);
            if (uniqueError)
                return uniqueError;
            let id;
            const newest = yield mongo_db_1.userCollection.findOne({}, { sort: { _id: -1 } });
            if (newest) {
                id = (Number(newest.id) + 1).toString();
            }
            else {
                id = "1";
            }
            const passwordHash = yield (0, passwordHashing_1.hashPassword)(password);
            const newUser = {
                id,
                login,
                passwordHash,
                email,
                createdAt: (new Date()).toISOString()
            };
            try {
                yield userRepository_1.userRepository.createUser(newUser);
                return id;
            }
            catch (error) {
                throw new Error(`Cannot create new user in repository: ${error.message}`);
            }
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield userQueryRepo_1.userQueryRepo.findUser(id);
            if (result === null)
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
