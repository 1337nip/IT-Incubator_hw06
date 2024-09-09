"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestAuthorization = void 0;
const admins_1 = require("../db/admins");
const requestAuthorization = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || auth.slice(0, 6) !== 'Basic ') {
        res.sendStatus(401);
        return;
    }
    const encodedAuth = auth.slice(6, Infinity);
    if (admins_1.adminsDB.find(p => p.base64 === encodedAuth)) {
        next();
    }
    else {
        return res.sendStatus(401);
    }
};
exports.requestAuthorization = requestAuthorization;
