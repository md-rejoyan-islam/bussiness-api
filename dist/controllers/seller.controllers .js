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
exports.deleteSellerById = exports.updateSellerById = exports.createSeller = exports.getSellerById = exports.getAllSellers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const responseHandler_1 = require("../helper/responseHandler");
const http_errors_1 = __importDefault(require("http-errors"));
exports.getAllSellers = (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sellers = [];
    if (!sellers.length)
        throw http_errors_1.default.NotFound("Couldn't find any seller data.");
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "All sellers data fetched successfully.",
        payload: {
            data: null,
        },
    });
}));
exports.getSellerById = (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const seller = {};
    if (!seller)
        throw http_errors_1.default.NotFound("Counldn't find any seller data.");
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Seller data fetched successfully.",
        payload: {
            data: null,
        },
    });
}));
exports.createSeller = (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const seller = {};
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 201,
        message: "Seller created successfully.",
        payload: {
            data: seller,
        },
    });
}));
exports.updateSellerById = (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const seller = {};
    if (!seller)
        throw http_errors_1.default.NotFound("Couldn't find any seller data.");
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Seller data updated successfully.",
        payload: {
            data: null,
        },
    });
}));
exports.deleteSellerById = (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const seller = {};
    if (!seller)
        throw http_errors_1.default.NotFound("Couldn't find any seller data.");
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Seller data deleted successfully.",
        payload: {
            data: null,
        },
    });
}));
