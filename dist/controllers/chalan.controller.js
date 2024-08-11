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
exports.deleteChalanById = exports.updateChalanById = exports.createChalan = exports.getChalanById = exports.getAllChalans = void 0;
const prisma_1 = require("./../helper/prisma");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const responseHandler_1 = require("../helper/responseHandler");
const http_errors_1 = __importDefault(require("http-errors"));
exports.getAllChalans = (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chalan = yield prisma_1.prismaClient.chalan.findMany({
        include: {
            product: true,
            gray: true,
            dyeing: true,
        },
    });
    if (!chalan.length)
        throw http_errors_1.default.NotFound("Couldn't find any chalan data.");
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "All chalan data fetched successfully.",
        payload: {
            total: chalan.length,
            data: chalan,
        },
    });
}));
exports.getChalanById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chalan = yield prisma_1.prismaClient.chalan.findUnique({
        where: {
            id: +req.params.id,
        },
    });
    if (!chalan)
        throw http_errors_1.default.NotFound("Counldn't find any chalan data.");
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "chalan data fetched successfully.",
        payload: {
            data: chalan,
        },
    });
}));
exports.createChalan = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { grayId } = req.body;
    const gray = yield prisma_1.prismaClient.gray.findUnique({
        where: {
            id: +grayId,
        },
    });
    if (!gray)
        throw (0, http_errors_1.default)("Invalid gray id.");
    const chalan = yield prisma_1.prismaClient.chalan.create({
        data: req.body,
    });
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 201,
        message: "chalan created successfully.",
        payload: {
            data: chalan,
        },
    });
}));
exports.updateChalanById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield prisma_1.prismaClient.chalan.findUnique({
        where: { id: +req.params.id },
    });
    if (!exist)
        throw (0, http_errors_1.default)("Couldn't find chalan by this id.");
    const chalan = yield prisma_1.prismaClient.chalan.update({
        where: {
            id: +req.params.id,
        },
        data: req.body,
    });
    if (!chalan)
        throw http_errors_1.default.NotFound("Couldn't find any chalan data.");
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "chalan updated successfully.",
        payload: {
            data: chalan,
        },
    });
}));
exports.deleteChalanById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chalan = yield prisma_1.prismaClient.chalan.findUnique({
        where: { id: +req.params.id },
    });
    if (!chalan)
        throw http_errors_1.default.NotFound("Couldn't find any chalan data.");
    yield prisma_1.prismaClient.chalan.delete({
        where: {
            id: +req.params.id,
        },
    });
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Chalan data deleted successfully.",
        payload: {
            data: chalan,
        },
    });
}));
