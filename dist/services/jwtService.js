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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const settings_1 = require("../settings");
const mongo_db_1 = require("../db/mongo-db");
exports.jwtService = {
    jwtCreate(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                jsonwebtoken_1.default.sign({ userId: user.id }, settings_1.SETTINGS.JWT.SECRET, { expiresIn: '10 days' }, (err, token) => {
                    if (err)
                        reject(new Error('jwtService: cannot jwt.sign'));
                    if (token)
                        resolve(token);
                });
            });
        });
    },
    jwtGetUserId(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield new Promise((resolve, reject) => {
                jsonwebtoken_1.default.verify(token, settings_1.SETTINGS.JWT.SECRET, (err, decoded) => {
                    if (err) {
                        reject('Bad token: ' + err);
                    }
                    if (decoded) {
                        resolve(decoded);
                    }
                });
            });
            const userCheck = yield mongo_db_1.userCollection.findOne({ id: result.userId });
            if (!userCheck)
                throw new Error('User with this id does not exist');
            return result.userId;
        });
    }
};
