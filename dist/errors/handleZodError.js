"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (error) => {
    var _a;
    const errors = error === null || error === void 0 ? void 0 : error.issues.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue === null || issue === void 0 ? void 0 : issue.message,
        };
    });
    const statusCode = 400;
    if (process.env.NODE_ENV === "development") {
        return {
            statusCode,
            message: (_a = errors[0]) === null || _a === void 0 ? void 0 : _a.message,
            errors,
        };
    }
    return {
        statusCode,
        message: "Validation Error",
        errors,
    };
};
exports.default = handleZodError;
