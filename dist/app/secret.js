"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeEnv = exports.accessCookiemaxAge = exports.accessTokenExpire = exports.accessTokenSecret = exports.passwordResetCookiesMaxAge = exports.passwordResetSecretExpire = exports.passwordResetSecret = exports.hostname = exports.port = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.port = process.env.SERVER_PORT || "5050";
exports.hostname = process.env.SERVER_HOST || "127.0.0.1";
exports.passwordResetSecret = "rereer";
exports.passwordResetSecretExpire = 10 * 3600;
exports.passwordResetCookiesMaxAge = 1000 * 60 * 5;
exports.accessTokenSecret = "rere";
exports.accessTokenExpire = 103600;
exports.accessCookiemaxAge = 1000 * 60 * 5;
exports.nodeEnv = "development";
