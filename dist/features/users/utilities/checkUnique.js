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
exports.checkUnique = void 0;
const mongo_db_1 = require("../../../db/mongo-db");
const checkUnique = (login, email) => __awaiter(void 0, void 0, void 0, function* () {
    let result1 = yield mongo_db_1.userCollection.findOne({ login: login });
    if (result1) {
        return {
            errorsMessages: [{ field: 'login', message: 'this login already exists' }]
        };
    }
    let result2 = yield mongo_db_1.userCollection.findOne({ email: email });
    if (result2) {
        return {
            errorsMessages: [{ field: 'email', message: 'this email already exists' }]
        };
    }
    return null;
});
exports.checkUnique = checkUnique;
