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
exports.eraseDB = exports.connectToDb = exports.commentCollection = exports.userCollection = exports.postsCollection = exports.blogsCollection = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
let client = {};
let db = {};
exports.blogsCollection = {};
exports.postsCollection = {};
exports.userCollection = {};
exports.commentCollection = {};
const connectToDb = (MONGO_URL) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        client = new mongodb_1.MongoClient(MONGO_URL);
        db = client.db(process.env.DB_name);
        exports.blogsCollection = db.collection('blogs');
        exports.postsCollection = db.collection('posts');
        exports.userCollection = db.collection('users');
        exports.commentCollection = db.collection('comments');
        yield client.connect();
        yield db.command({ ping: 1 });
        console.log('Connected to DB');
    }
    catch (err) {
        console.log(err);
        yield client.close();
    }
});
exports.connectToDb = connectToDb;
const eraseDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.blogsCollection.deleteMany();
    yield exports.postsCollection.deleteMany();
    yield exports.userCollection.deleteMany();
    yield exports.commentCollection.deleteMany();
});
exports.eraseDB = eraseDB;
