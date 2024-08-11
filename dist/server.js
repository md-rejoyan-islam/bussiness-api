"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("./helper/logger");
const app_1 = __importDefault(require("./app/app"));
const secret_1 = require("./app/secret");
let server = new http_1.Server(app_1.default);
dotenv_1.default.config();
app_1.default.listen(secret_1.port, () => {
    logger_1.logger.info(`server is running on http://localhost:${secret_1.port} or http://${secret_1.hostname}:${secret_1.port}`);
});
process.on("unhandledRejection", (error) => {
    if (server) {
        server.close(() => {
            logger_1.errorLogger.error(error);
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
});
process.on("uncaughtException", (error) => {
    logger_1.errorLogger.error(error);
});
