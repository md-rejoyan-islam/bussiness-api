"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const randomCodeGenerator = (length) => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvyxyz";
    let result = "";
    for (let i = 1; i <= length; i++) {
        const random = Math.floor(Math.random() * charset.length);
        result += charset[random];
    }
    return result;
};
exports.default = randomCodeGenerator;
