"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleClientError = (error) => {
    var _a, _b, _c, _d, _e, _f, _g;
    let errors = [];
    let message = error.message;
    const statusCode = 400;
    console.log(error);
    if (error.code === "P2025") {
        message = ((_a = error.meta) === null || _a === void 0 ? void 0 : _a.cause) || "Record not found!";
        errors = [
            {
                path: (_b = error.meta) === null || _b === void 0 ? void 0 : _b.modelName,
                message,
            },
        ];
    }
    else if (error.code === "P2003") {
        if (error.message.includes("delete()` invocation:")) {
            message = "Delete failed";
            errors = [
                {
                    path: "",
                    message,
                },
            ];
        }
    }
    else if (error.code === "P2002") {
        message = "Unique constraint violation";
        errors = [
            {
                path: (_c = error.meta) === null || _c === void 0 ? void 0 : _c.target,
                message: `${((_d = error.meta) === null || _d === void 0 ? void 0 : _d.target).split("_")[1]} already exists.`,
            },
        ];
    }
    else if ((error.code = "P2032")) {
        message = "Invalid relation";
        errors = [
            {
                path: (_e = error.meta) === null || _e === void 0 ? void 0 : _e.field,
                message: `Expected type ${(_f = error.meta) === null || _f === void 0 ? void 0 : _f.expected_type}, but got ${(_g = error.meta) === null || _g === void 0 ? void 0 : _g.found}`,
            },
        ];
    }
    return {
        statusCode,
        message,
        errors,
    };
};
exports.default = handleClientError;
