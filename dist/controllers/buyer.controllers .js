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
exports.deleteBuyerById = exports.updateBuyerById = exports.createBuyer = exports.getBuyerById = exports.getAllBuyers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const responseHandler_1 = require("../helper/responseHandler");
const http_errors_1 = __importDefault(require("http-errors"));
exports.getAllBuyers = (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const buyers = [];
    if (!buyers.length)
        throw http_errors_1.default.NotFound("Couldn't find any buyers data.");
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "All buyers data fetched successfully.",
        payload: {
            data: null,
        },
    });
}));
exports.getBuyerById = (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const buyer = {};
    if (!buyer)
        throw http_errors_1.default.NotFound("Counldn't find any buyer data.");
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "buyer data fetched successfully.",
        payload: {
            data: null,
        },
    });
}));
exports.createBuyer = (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const buyer = {};
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 201,
        message: "buyer created successfully.",
        payload: {
            data: buyer,
        },
    });
}));
exports.updateBuyerById = (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const buyer = {};
    if (!buyer)
        throw http_errors_1.default.NotFound("Couldn't find any buyer data.");
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "buyer updated successfully.",
        payload: {
            data: null,
        },
    });
}));
exports.deleteBuyerById = (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const buyer = {};
    if (!buyer)
        throw http_errors_1.default.NotFound("Couldn't find any buyer data.");
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "buyer deleted successfully.",
        payload: {
            data: null,
        },
    });
}));
