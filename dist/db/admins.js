"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminsDB = void 0;
const encrypt = (name, password) => {
    let param = name + ':' + password;
    return Buffer.from(param).toString('base64');
};
exports.adminsDB = [
    { name: 'admin', password: 'qwerty', get base64() { return encrypt(this.name, this.password); } },
    { name: 'boss', password: 'godlovesex', get base64() { return encrypt(this.name, this.password); } }
];
