"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (error) => {
    console.log(error);
    const errors = [
        {
            path: "",
            message: error.message,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "Validation Error",
        errors,
    };
};
exports.default = handleValidationError;
