"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookie = exports.clearCookie = void 0;
const secret_1 = require("../app/secret");
const clearCookie = (res, cookieName) => {
    res.clearCookie(cookieName, {
        secure: secret_1.nodeEnv == "development" ? false : true,
        sameSite: secret_1.nodeEnv === "development" ? "strict" : "none",
        httpOnly: true,
    });
};
exports.clearCookie = clearCookie;
const setCookie = ({ res, cookieName, cookieValue, maxAge, }) => {
    res.cookie(cookieName, cookieValue, {
        httpOnly: true,
        maxAge,
        secure: secret_1.nodeEnv === "development" ? false : true,
        sameSite: secret_1.nodeEnv === "development" ? "strict" : "none",
    });
};
exports.setCookie = setCookie;
