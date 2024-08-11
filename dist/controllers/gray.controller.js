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
exports.deleteGrayPaymentById = exports.updateGrayPaymentById = exports.grayPayment = exports.deleteGrayById = exports.updateGrayById = exports.createGray = exports.getGrayById = exports.getAllGrays = void 0;
const prisma_1 = require("./../helper/prisma");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const responseHandler_1 = require("../helper/responseHandler");
const http_errors_1 = __importDefault(require("http-errors"));
exports.getAllGrays = (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const grays = yield prisma_1.prismaClient.gray.findMany({
        include: {
            products: {
                include: {
                    gray_payments: true,
                },
            },
        },
    });
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "All grays data fetched successfully.",
        payload: {
            total: (grays === null || grays === void 0 ? void 0 : grays.length) || 0,
            data: grays || [],
        },
    });
}));
exports.getGrayById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gray = yield prisma_1.prismaClient.gray.findUnique({
        where: {
            id: +req.params.id,
        },
        include: {
            products: {
                include: {
                    gray_payments: true,
                },
            },
        },
    });
    if (!gray)
        throw http_errors_1.default.NotFound("Counldn't find any gray data.");
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "gray data fetched successfully.",
        payload: {
            data: gray,
        },
    });
}));
exports.createGray = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield prisma_1.prismaClient.gray.findUnique({
        where: {
            name: req.body.name,
        },
    });
    if (exist)
        throw http_errors_1.default.BadRequest("Name already exist.");
    const gray = yield prisma_1.prismaClient.gray.create({
        data: req.body,
    });
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 201,
        message: "gray created successfully.",
        payload: {
            data: gray,
        },
    });
}));
exports.updateGrayById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield prisma_1.prismaClient.gray.findUnique({
        where: { id: +req.params.id },
    });
    if (!exist)
        throw (0, http_errors_1.default)("Couldn't find gray by this id.");
    const gray = yield prisma_1.prismaClient.gray.update({
        where: {
            id: +req.params.id,
        },
        data: req.body,
    });
    if (!gray)
        throw http_errors_1.default.NotFound("Couldn't find any gray data.");
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "gray updated successfully.",
        payload: {
            data: gray,
        },
    });
}));
exports.deleteGrayById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const gray = yield prisma_1.prismaClient.gray.findUnique({
        where: { id: +req.params.id },
        include: {
            products: true,
        },
    });
    if (!gray)
        throw http_errors_1.default.NotFound("Couldn't find any gray data.");
    yield prisma_1.prismaClient.product.deleteMany({
        where: {
            grayId: gray.id,
        },
    });
    yield prisma_1.prismaClient.gray.delete({
        where: {
            id: +req.params.id,
        },
    });
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Gray data deleted successfully.",
        payload: {
            data: gray,
        },
    });
}));
exports.grayPayment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, grayId } = req.body;
    const gray = yield prisma_1.prismaClient.gray.findUnique({
        where: { id: grayId },
        include: {
            products: true,
        },
    });
    if (!gray)
        throw http_errors_1.default.NotFound("Gray data not found!");
    const product = gray === null || gray === void 0 ? void 0 : gray.products.find((product) => product.id === productId);
    if (!product)
        throw http_errors_1.default.NotFound("Product not found in gray data.");
    const payment = yield prisma_1.prismaClient.grayPayment.create({
        data: Object.assign({}, req.body),
    });
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Payment successfully",
        payload: {
            data: payment,
        },
    });
}));
exports.updateGrayPaymentById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payment = yield prisma_1.prismaClient.grayPayment.findUnique({
        where: { id: +id },
    });
    if (!payment)
        throw http_errors_1.default.NotFound("Payment not found!");
    const updatedPayment = yield prisma_1.prismaClient.grayPayment.update({
        where: { id: +id },
        data: req.body,
    });
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Payment updated successfully",
        payload: {
            data: updatedPayment,
        },
    });
}));
exports.deleteGrayPaymentById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payment = yield prisma_1.prismaClient.grayPayment.findUnique({
        where: { id: +id },
    });
    if (!payment)
        throw http_errors_1.default.NotFound("Payment not found!");
    yield prisma_1.prismaClient.grayPayment.delete({
        where: { id: +id },
    });
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Payment deleted successfully",
        payload: {
            data: payment,
        },
    });
}));
