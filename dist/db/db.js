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
exports.connectToDb = exports.DB = void 0;
const mongodb_1 = require("mongodb");
const settings_1 = require("../settings");
const client = new mongodb_1.MongoClient(settings_1.SETTINGS.MONGO_URL);
exports.DB = client.db(settings_1.SETTINGS.DB_NAME);
const connectToDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        yield client.db(settings_1.SETTINGS.DB_NAME).command({ ping: 1 });
        console.log('Connected to DB');
    }
    catch (err) {
        console.log(err);
        yield client.close();
    }
});
exports.connectToDb = connectToDb;
