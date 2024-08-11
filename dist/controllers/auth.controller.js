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
exports.resetPassword = exports.forgotPassword = exports.loggedInUser = exports.userLogout = exports.userLogin = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_errors_1 = __importDefault(require("http-errors"));
const cookies_1 = require("../helper/cookies");
const createJWT_1 = __importDefault(require("../helper/createJWT"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret_1 = require("../app/secret");
const responseHandler_1 = require("../helper/responseHandler");
const randomCodeGeneraor_1 = __importDefault(require("../helper/randomCodeGeneraor"));
const prisma_1 = require("../helper/prisma");
const hashPassword_1 = __importDefault(require("../helper/hashPassword"));
exports.userLogin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield (prisma_1.prismaClient === null || prisma_1.prismaClient === void 0 ? void 0 : prisma_1.prismaClient.user.findUnique({
        where: {
            email,
        },
    }));
    if (!user) {
        throw http_errors_1.default.NotFound("Couldn't find any user data. ");
    }
    else {
        const isMatchPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!isMatchPassword)
            throw (0, http_errors_1.default)(400, "Wrong password. Please try again.");
    }
    const accessToken = yield (0, createJWT_1.default)({ email, role: user.role }, secret_1.accessTokenSecret, secret_1.accessTokenExpire);
    (0, cookies_1.setCookie)({
        res,
        cookieName: "accessToken",
        cookieValue: accessToken,
        maxAge: secret_1.accessCookiemaxAge,
    });
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "User data fetched successfully.",
        payload: {
            data: user,
        },
    });
}));
exports.userLogout = (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, cookies_1.clearCookie)(res, "accessToken");
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Successfully Logout.",
    });
}));
exports.loggedInUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(req === null || req === void 0 ? void 0 : req.me))
        throw (0, http_errors_1.default)(404, "Couldn't find any user.");
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Login user data.",
        payload: {
            data: req.me,
        },
    });
}));
exports.forgotPassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield (prisma_1.prismaClient === null || prisma_1.prismaClient === void 0 ? void 0 : prisma_1.prismaClient.user.findUnique({
        where: {
            email,
        },
    }));
    if (!user)
        throw http_errors_1.default.NotFound("Couln't find any user account.");
    const code = (0, randomCodeGeneraor_1.default)(5);
    const emailData = {
        to: user.email,
        subject: "Password Reset Code",
        code,
    };
    console.log(emailData);
    const resetToken = yield (0, createJWT_1.default)({
        email: user.email,
        code,
    }, secret_1.passwordResetSecret, secret_1.passwordResetSecretExpire);
    (0, cookies_1.setCookie)({
        res,
        cookieName: "resetToken",
        cookieValue: resetToken,
        maxAge: secret_1.passwordResetCookiesMaxAge,
    });
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Password reset code sent successfully",
        payload: {
            code,
        },
    });
}));
exports.resetPassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, newPassword } = req.body;
    const resetToken = req.cookies.resetToken;
    if (!resetToken)
        throw http_errors_1.default.NotFound("Reset token not found.");
    jsonwebtoken_1.default.verify(resetToken, secret_1.passwordResetSecret, (err, decode) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            (0, cookies_1.clearCookie)(res, "resetToken");
            return (0, responseHandler_1.errorResponse)(res, {
                statusCode: 400,
                message: "Unauthorized, Invalid access token.Please login again.",
            });
        }
        const user = yield prisma_1.prismaClient.user.findUnique({
            where: { email: decode === null || decode === void 0 ? void 0 : decode.email },
        });
        if (!user) {
            return (0, responseHandler_1.errorResponse)(res, {
                statusCode: 400,
                message: "Reset token email not found.",
            });
        }
        if (code != decode.code) {
            return (0, responseHandler_1.errorResponse)(res, {
                statusCode: 400,
                message: "Code doesn't match.",
            });
        }
        const updatedUser = yield prisma_1.prismaClient.user.update({
            where: {
                email: decode.email,
            },
            data: {
                password: (0, hashPassword_1.default)(newPassword),
            },
        });
        (0, cookies_1.clearCookie)(res, "resetToken");
        (0, responseHandler_1.successResponse)(res, {
            statusCode: 200,
            message: "Password reset successfully",
            payload: {
                data: updatedUser,
            },
        });
    }));
}));
