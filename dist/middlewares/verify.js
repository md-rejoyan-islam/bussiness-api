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
exports.isLoggedOut = exports.isLoggedIn = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookies_1 = require("../helper/cookies");
const prisma_1 = require("../helper/prisma");
const responseHandler_1 = require("../helper/responseHandler");
const secret_1 = require("../app/secret");
exports.isLoggedIn = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.cookies);
    const token = (_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
    if (!token) {
        throw (0, http_errors_1.default)(401, "Unauthorized, Access token not found. Please login.");
    }
    jsonwebtoken_1.default.verify(token, secret_1.accessTokenSecret, (err, decode) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            (0, cookies_1.clearCookie)(res, "accessToken");
            return (0, responseHandler_1.errorResponse)(res, {
                statusCode: 400,
                message: "Unauthorized, Invalid access token.Please login again.",
            });
        }
        const loginUser = yield prisma_1.prismaClient.user.findUnique({
            where: { email: decode === null || decode === void 0 ? void 0 : decode.email },
        });
        if (!loginUser) {
            (0, cookies_1.clearCookie)(res, "accessToken");
            return (0, responseHandler_1.errorResponse)(res, {
                statusCode: 400,
                message: "Unauthorized, Please login .",
            });
        }
        req.me = Object.assign(Object.assign({}, loginUser), { id: +(loginUser === null || loginUser === void 0 ? void 0 : loginUser.id) });
        next();
    }));
}));
exports.isLoggedOut = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const authToken = (_a = req === null || req === void 0 ? void 0 : req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
    if (authToken) {
        jsonwebtoken_1.default.verify(authToken, secret_1.accessTokenSecret, (err, decode) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                (0, cookies_1.clearCookie)(res, "accessToken");
                return (0, responseHandler_1.errorResponse)(res, {
                    statusCode: 400,
                    message: "Unauthorized, Invalid access token.Please login again",
                });
            }
            const loginUser = yield prisma_1.prismaClient.user.findUnique({
                where: {
                    email: decode.email,
                },
            });
            if (!loginUser) {
                (0, cookies_1.clearCookie)(res, "accessToken");
                return (0, responseHandler_1.errorResponse)(res, {
                    statusCode: 400,
                    message: "Unauthorized, User not found.Please login again",
                });
            }
            else {
                return (0, responseHandler_1.errorResponse)(res, {
                    statusCode: 400,
                    message: "User is already loggedin",
                });
            }
            return (0, responseHandler_1.errorResponse)(res, {
                statusCode: 400,
                message: "User is already logged in",
            });
        }));
    }
    else {
        next();
    }
}));
