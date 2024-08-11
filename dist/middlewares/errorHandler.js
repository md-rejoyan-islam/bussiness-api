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
exports.errorHandler = void 0;
const responseHandler_1 = require("../helper/responseHandler");
const client_1 = require("@prisma/client");
const handleClientError_1 = __importDefault(require("../errors/handleClientError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const zod_1 = require("zod");
const errorHandler = (error, _req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let errorMessage = error.message || "UnKnown Error";
        let errorStatus = error.status || 500;
        let errorMessages = [];
        if (error instanceof client_1.Prisma.PrismaClientValidationError) {
            const { statusCode, message, errors } = (0, handleValidationError_1.default)(error);
            errorMessage = message;
            errorStatus = statusCode;
            errorMessages = errors;
        }
        else if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            const { statusCode, message, errors } = (0, handleClientError_1.default)(error);
            errorMessage = message;
            errorStatus = statusCode;
            errorMessages = errors;
        }
        else if (error instanceof zod_1.ZodError) {
            const { statusCode, message, errors } = (0, handleZodError_1.default)(error);
            errorMessage = message;
            errorStatus = statusCode;
            errorMessages = errors;
        }
        (0, responseHandler_1.errorResponse)(res, {
            statusCode: errorStatus,
            message: errorMessage,
            errors: errorMessages.length ? errorMessages : null,
        });
    }
    catch (error) {
        const errorMessage = error.message || "Internal server error";
        (0, responseHandler_1.errorResponse)(res, {
            statusCode: 500,
            message: errorMessage,
        });
    }
});
exports.errorHandler = errorHandler;
