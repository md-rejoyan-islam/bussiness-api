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
exports.thaanCountAddToProduct = exports.productAddToDyeing = exports.deleteProductById = exports.updateProductById = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const prisma_1 = require("./../helper/prisma");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const responseHandler_1 = require("../helper/responseHandler");
const http_errors_1 = __importDefault(require("http-errors"));
exports.getAllProducts = (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield prisma_1.prismaClient.product.findMany({
        include: {
            chalan: true,
            gray: true,
            dyeing: true,
            dyeing_payments: true,
            gray_payments: true,
            thaan_count: true,
        },
    });
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "All Products data fetched successfully.",
        payload: {
            totalProduct: products === null || products === void 0 ? void 0 : products.length,
            data: products || [],
        },
    });
}));
exports.getProductById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield prisma_1.prismaClient.product.findUnique({
        where: {
            id: +req.params.id,
        },
        include: {
            gray: true,
            dyeing: true,
            gray_payments: true,
            dyeing_payments: true,
            thaan_count: true,
        },
    });
    if (!product)
        throw http_errors_1.default.NotFound("Counldn't find any product data.");
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Product data fetched successfully.",
        payload: {
            data: product,
        },
    });
}));
exports.createProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let { chalanNumber } = req.body;
    const { grayId } = req.body;
    const gray = yield prisma_1.prismaClient.gray.findUnique({
        where: { id: +grayId },
    });
    if (!gray)
        throw (0, http_errors_1.default)("Couldn't find any gray by grayId.");
    if (chalanNumber) {
        const chalan = yield prisma_1.prismaClient.chalan.findUnique({
            where: {
                chalanNumber,
            },
        });
        if (!chalan)
            throw (0, http_errors_1.default)("Invalid chalan id.");
        if (chalan.productId)
            throw (0, http_errors_1.default)("Already use this chalan id");
    }
    else {
        const chalans = yield prisma_1.prismaClient.chalan.findMany({
            orderBy: [
                {
                    chalanNumber: "desc",
                },
            ],
        });
        const chalan = yield prisma_1.prismaClient.chalan.create({
            data: {
                grayId: +req.body.grayId,
                chalanNumber: +((_a = chalans[0]) === null || _a === void 0 ? void 0 : _a.chalanNumber) + 1 || 1,
            },
        });
        console.log(chalan);
        chalanNumber = chalan.chalanNumber;
    }
    console.log(3);
    const product = yield prisma_1.prismaClient.product.create({
        data: Object.assign(Object.assign({}, req.body), { chalanNumber }),
    });
    yield prisma_1.prismaClient.chalan.update({
        where: {
            chalanNumber: product.chalanNumber,
        },
        data: {
            productId: product.id,
        },
    });
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 201,
        message: "Product created successfully.",
        payload: {
            data: product,
        },
    });
}));
exports.updateProductById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield prisma_1.prismaClient.product.findUnique({
        where: {
            id: +req.params.id,
        },
    });
    if (!exist)
        throw http_errors_1.default.NotFound("Couldn't find any product data.");
    const product = yield prisma_1.prismaClient.product.update({
        where: { id: +req.params.id },
        data: req.body,
    });
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Product updated successfully.",
        payload: {
            data: product,
        },
    });
}));
exports.deleteProductById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const exist = yield prisma_1.prismaClient.product.findUnique({
        where: {
            id: +req.params.id,
        },
    });
    if (!exist)
        throw http_errors_1.default.NotFound("Couldn't find any product data.");
    if (exist &&
        "gray_payments" in exist &&
        Array.isArray(exist.gray_payments) &&
        ((_a = exist === null || exist === void 0 ? void 0 : exist.gray_payments) === null || _a === void 0 ? void 0 : _a.length)) {
        yield prisma_1.prismaClient.grayPayment.deleteMany({
            where: { id: exist === null || exist === void 0 ? void 0 : exist.grayId },
        });
    }
    if ("dyeing_payments" in exist &&
        Array.isArray(exist === null || exist === void 0 ? void 0 : exist.dyeing_payments) &&
        exist.dyeing_payments.length &&
        "dyeingId" in exist &&
        exist.dyeingId) {
        yield prisma_1.prismaClient.dyeingPayment.deleteMany({
            where: { id: exist === null || exist === void 0 ? void 0 : exist.dyeingId },
        });
    }
    if ("chalanNumber" in exist && (exist === null || exist === void 0 ? void 0 : exist.chalanNumber)) {
        yield prisma_1.prismaClient.chalan.delete({
            where: { chalanNumber: exist === null || exist === void 0 ? void 0 : exist.chalanNumber },
        });
    }
    yield prisma_1.prismaClient.product.delete({
        where: { id: +req.params.id },
    });
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Product deleted successfully.",
        payload: {
            data: exist,
        },
    });
}));
exports.productAddToDyeing = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, dyeingId } = req.body;
    const product = yield prisma_1.prismaClient.product.findUnique({
        where: { id: productId },
    });
    if (!product)
        throw http_errors_1.default.NotFound("Couldn't find any product.");
    const dyeing = yield prisma_1.prismaClient.dyeing.findUnique({
        where: { id: dyeingId },
    });
    if (!dyeing)
        throw http_errors_1.default.NotFound("Couldn't find dyeing id in database.");
    console.log(2);
    const updatedProduct = yield prisma_1.prismaClient.product.update({
        where: {
            id: productId,
        },
        data: {
            dyeingId,
            dyeing_date: req.body.dyeing_date,
            dyeing_rate: req.body.dyeing_rate,
        },
    });
    yield prisma_1.prismaClient.chalan.update({
        where: { chalanNumber: product.chalanNumber },
        data: {
            productId: updatedProduct.id,
            dyeingId: updatedProduct.dyeingId,
        },
    });
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Product Add to Dyeing",
        payload: {
            data: updatedProduct,
        },
    });
}));
exports.thaanCountAddToProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, thaanData } = req.body;
    console.log(req.body);
    const product = yield prisma_1.prismaClient.product.findUnique({
        where: { id: +productId },
    });
    if (!product)
        throw http_errors_1.default.NotFound("Couldn't find any product.");
    const thaans = yield prisma_1.prismaClient.thaanCount.createMany({
        data: thaanData === null || thaanData === void 0 ? void 0 : thaanData.map((thaan) => {
            return Object.assign(Object.assign({}, thaan), { productId });
        }),
    });
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Thaan Count Add to Product",
        payload: {
            data: thaans,
        },
    });
}));
