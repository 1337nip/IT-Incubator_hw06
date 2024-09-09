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
exports.authService = void 0;
const mongo_db_1 = require("../../../db/mongo-db");
const passwordHashing_1 = require("../../../utilities/passwordHashing");
exports.authService = {
    login(loginOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = {
                    $or: [{ login: loginOrEmail }, { email: loginOrEmail }]
                };
                const result = yield mongo_db_1.userCollection.findOne(filter);
                if (result === null)
                    return false;
                const pswCheck = yield (0, passwordHashing_1.checkPassword)(password, result.passwordHash);
                if (pswCheck === false)
                    return false;
                return true;
            }
            catch (error) {
                throw new Error(`Cannot execute login: ${error.message}`);
            }
        });
    }
};
