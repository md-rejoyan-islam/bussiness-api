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
exports.deleteDyeingPaymentById = exports.updateDyeingPaymentById = exports.dyeingPayment = exports.deleteDyeingById = exports.updateDyeingById = exports.createDyeing = exports.getDyeingById = exports.getAllDyeings = void 0;
const prisma_1 = require("./../helper/prisma");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const responseHandler_1 = require("../helper/responseHandler");
const http_errors_1 = __importDefault(require("http-errors"));
exports.getAllDyeings = (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dyeings = yield prisma_1.prismaClient.dyeing.findMany({
        include: {
            products: {
                include: {
                    dyeing_payments: true,
                    gray: true,
                },
            },
        },
    });
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "All dyeing data fetched successfully.",
        payload: {
            total: dyeings.length || 0,
            data: dyeings || 0,
        },
    });
}));
exports.getDyeingById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dyeing = yield prisma_1.prismaClient.dyeing.findUnique({
        where: {
            id: +req.params.id,
        },
        include: {
            products: {
                include: {
                    dyeing_payments: true,
                    gray: true,
                    dyeing: true,
                },
            },
        },
    });
    if (!dyeing)
        throw http_errors_1.default.NotFound("Counldn't find any dyeing data.");
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "dyeing data fetched successfully.",
        payload: {
            data: dyeing,
        },
    });
}));
exports.createDyeing = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dyeing = yield prisma_1.prismaClient.dyeing.create({
        data: req.body,
    });
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 201,
        message: "dyeing created successfully.",
        payload: {
            data: dyeing,
        },
    });
}));
exports.updateDyeingById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield prisma_1.prismaClient.dyeing.findUnique({
        where: { id: +req.params.id },
    });
    if (!exist)
        throw (0, http_errors_1.default)("Couldn't find dyeing by this id.");
    const dyeing = yield prisma_1.prismaClient.dyeing.update({
        where: {
            id: +req.params.id,
        },
        data: req.body,
    });
    if (!dyeing)
        throw http_errors_1.default.NotFound("Couldn't find any dyeing data.");
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "dyeing updated successfully.",
        payload: {
            data: dyeing,
        },
    });
}));
exports.deleteDyeingById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dyeing = yield prisma_1.prismaClient.dyeing.findUnique({
        where: { id: +req.params.id },
    });
    if (!dyeing)
        throw http_errors_1.default.NotFound("Couldn't find any dyeing data.");
    yield prisma_1.prismaClient.dyeing.delete({
        where: {
            id: +req.params.id,
        },
    });
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Dyeing data deleted successfully.",
        payload: {
            data: dyeing,
        },
    });
}));
exports.dyeingPayment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, dyeingId } = req.body;
    const dyeing = yield prisma_1.prismaClient.dyeing.findUnique({
        where: { id: dyeingId },
        include: {
            products: true,
        },
    });
    if (!dyeing)
        throw http_errors_1.default.NotFound("Dyeing data not found!");
    const product = dyeing === null || dyeing === void 0 ? void 0 : dyeing.products.find((product) => product.id === productId);
    if (!product)
        throw http_errors_1.default.NotFound("Product not found in gray data.");
    const payment = yield prisma_1.prismaClient.dyeingPayment.create({
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
exports.updateDyeingPaymentById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payment = yield prisma_1.prismaClient.dyeingPayment.findUnique({
        where: { id: +id },
    });
    if (!payment)
        throw http_errors_1.default.NotFound("Payment not found!");
    const updatedPayment = yield prisma_1.prismaClient.dyeingPayment.update({
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
exports.deleteDyeingPaymentById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payment = yield prisma_1.prismaClient.dyeingPayment.findUnique({
        where: { id: +id },
    });
    if (!payment)
        throw http_errors_1.default.NotFound("Payment not found!");
    yield prisma_1.prismaClient.dyeingPayment.delete({
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
