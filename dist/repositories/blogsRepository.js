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
exports.blogsRepository = void 0;
const mongo_db_1 = require("../db/mongo-db");
exports.blogsRepository = {
    getAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_db_1.blogsCollection.find({}, { projection: { _id: 0 } }).toArray();
        });
    },
    findBlog(passedID) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_db_1.blogsCollection.findOne({ id: passedID }, { projection: { _id: 0 } });
        });
    },
    deleteBlog(passedID) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongo_db_1.blogsCollection.deleteOne({ id: passedID });
            if (result.deletedCount === 0) {
                throw new Error('Not found');
            }
        });
    },
    createBlog(passedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, websiteUrl } = passedData;
            const newest = yield mongo_db_1.blogsCollection.findOne({}, { sort: { _id: -1 } });
            let newID;
            if (newest) {
                newID = (Number(newest.id) + 1).toString();
            }
            else {
                newID = "1";
            }
            const newBlog = {
                id: newID,
                name,
                description,
                websiteUrl,
                createdAt: (new Date()).toISOString(),
                isMembership: false
            };
            const newBlogOutput = structuredClone(newBlog);
            yield mongo_db_1.blogsCollection.insertOne(newBlog);
            return (newBlogOutput);
        });
    },
    updateBlog(passedID, passedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, websiteUrl } = passedData;
            const result = yield mongo_db_1.blogsCollection.updateOne({ id: passedID }, { $set: { name, description, websiteUrl } });
            if (result.matchedCount === 0) {
                throw new Error('Document for an update is not found');
            }
        });
    }
};
