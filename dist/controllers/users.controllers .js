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
exports.createUser = exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getAllUsers = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const responseHandler_1 = require("../helper/responseHandler");
const prisma_1 = require("../helper/prisma");
const hashPassword_1 = __importDefault(require("../helper/hashPassword"));
exports.getAllUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.query.page = req.query.page || "1";
    req.query.limit = req.query.limit || "10";
    const users = yield prisma_1.prismaClient.user.findMany({});
    if (!users.length)
        throw http_errors_1.default.NotFound("Couldn't find any users data");
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "User data fetched successfully",
        payload: {
            data: users,
        },
    });
}));
exports.getUserById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (prisma === null || prisma === void 0 ? void 0 : prisma.user.findUnique({
        where: {
            id: +req.params.id,
        },
    }));
    if (!user)
        throw http_errors_1.default.NotFound("Couldn't find any user data.");
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "User data fetched successfully",
        payload: {
            data: user,
        },
    });
}));
exports.updateUserById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = req.body;
    if ((_a = req.body) === null || _a === void 0 ? void 0 : _a.password) {
        data.password = (0, hashPassword_1.default)(req.body.password);
    }
    const user = yield (prisma === null || prisma === void 0 ? void 0 : prisma.user.findUnique({
        where: {
            id: +req.params.id,
        },
    }));
    if (!user)
        throw http_errors_1.default.NotFound("Couldn't find any user data.");
    const updatedUser = yield (prisma === null || prisma === void 0 ? void 0 : prisma.user.update({
        where: {
            id: +req.params.id,
        },
        data,
    }));
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "User data updated successfully",
        payload: {
            data: updatedUser,
        },
    });
}));
exports.deleteUserById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield (prisma === null || prisma === void 0 ? void 0 : prisma.user.delete({
        where: {
            id: +req.params.id,
        },
    }));
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "User data deleted successfully",
        payload: {
            data: deletedUser,
        },
    });
}));
exports.createUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = Object.assign({}, req.body);
    if (req.body.password) {
        data.password = (0, hashPassword_1.default)(req.body.password);
    }
    const user = yield prisma_1.prismaClient.user.create({
        data,
    });
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "User created successfully",
        payload: {
            data: user,
        },
    });
}));
