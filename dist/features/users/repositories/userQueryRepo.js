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
exports.userQueryRepo = void 0;
const mongo_db_1 = require("../../../db/mongo-db");
const userQueryHelper_1 = require("../utilities/userQueryHelper");
exports.userQueryRepo = {
    findUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield mongo_db_1.userCollection.findOne({ id });
            if (user === null)
                return null;
            const userOutput = {
                id: user.id,
                login: user.login,
                email: user.email,
                createdAt: user.createdAt
            };
            return userOutput;
        });
    },
    getUsers(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const processedQuery = (0, userQueryHelper_1.userQueryHelper)(query);
            let filter = {};
            let orCondition = [];
            if (processedQuery.searchLoginTerm)
                orCondition.push({ login: new RegExp(processedQuery.searchLoginTerm, 'i') });
            if (processedQuery.searchEmailTerm)
                orCondition.push({ email: new RegExp(processedQuery.searchEmailTerm, 'i') });
            if (orCondition.length > 0)
                filter.$or = orCondition;
            //filter = {$or : [{login:}, {emai:}]}
            const users = yield mongo_db_1.userCollection
                .find(filter)
                .sort(processedQuery.sortBy, processedQuery.sortDirection)
                .skip((processedQuery.pageNumber - 1) * processedQuery.pageSize)
                .limit(processedQuery.pageSize)
                .toArray();
            const totalCount = yield mongo_db_1.userCollection.countDocuments(filter);
            const pagesCount = Math.ceil(totalCount / processedQuery.pageSize);
            const usersOutput = users.map(users => {
                return {
                    id: users.id,
                    login: users.login,
                    email: users.email,
                    createdAt: users.createdAt
                };
            });
            return {
                "pagesCount": pagesCount,
                "page": processedQuery.pageNumber,
                "pageSize": processedQuery.pageSize,
                "totalCount": totalCount,
                "items": usersOutput
            };
        });
    },
    findUserByToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield mongo_db_1.userCollection.findOne({ id });
            if (user === null)
                return null;
            const userOutput = {
                email: user.email,
                login: user.login,
                userId: user.id
            };
            return userOutput;
        });
    },
};
