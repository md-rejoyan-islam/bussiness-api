"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const graySchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z
        .string({
        required_error: "Gray name is required",
        invalid_type_error: "Gray name must be string",
    })
        .min(3, "Gray name must be at least 3 character"),
    address: zod_1.z
        .string({
        required_error: "Gray address is required.",
        invalid_type_error: "Gray address must be string",
    })
        .min(3, "Gray address must be at least 3 character"),
    phone: zod_1.z
        .string({
        required_error: "Gray phone number is required.",
        invalid_type_error: "Gray name must be string.",
    })
        .min(8, "Gray phone number must be at least 3 character"),
});
exports.default = graySchema;
