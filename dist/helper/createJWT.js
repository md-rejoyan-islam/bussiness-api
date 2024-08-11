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
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("./logger");
const createJWT = (payload, secretKey, expiresIn) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof payload !== "object" || !payload) {
            throw (0, http_errors_1.default)(404, "Payload must be a non-empty object.");
        }
        if (typeof secretKey !== "string" || !secretKey) {
            throw (0, http_errors_1.default)(404, "Secret key must be a non-empty string");
        }
        return jsonwebtoken_1.default.sign(payload, secretKey, {
            expiresIn,
        });
    }
    catch (error) {
        logger_1.errorLogger.error(error);
    }
});
exports.default = createJWT;
