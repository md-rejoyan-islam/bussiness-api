"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.logger = void 0;
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const { combine, timestamp, label, printf, colorize } = winston_1.format;
const myFormat = printf(({ message, label, timestamp }) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${date.toDateString()} ${hour}:${minutes}:${seconds}  [${label}] : ${message}`;
});
const syslogColors = {
    info: "bold magenta inverse",
    error: "bold red inverse",
};
exports.logger = (0, winston_1.createLogger)({
    level: "info",
    format: combine(label({
        label: "success",
    }), colorize({
        all: true,
        colors: syslogColors,
    }), timestamp(), myFormat),
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: "src/logs/success/success-%DATE%.log",
            datePattern: "YYYY-MM-DD-HH-mm",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
        }),
    ],
});
exports.errorLogger = (0, winston_1.createLogger)({
    level: "error",
    format: combine(label({
        label: "error",
    }), colorize({
        all: true,
        colors: syslogColors,
    }), timestamp(), myFormat),
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: "src/logs/error/error-%DATE%.log",
            datePattern: "YYYY-MM-DD-HH-mm",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
        }),
    ],
});
