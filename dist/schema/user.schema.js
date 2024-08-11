"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string().optional(),
    email: zod_1.z
        .string({
        required_error: "Email is required.",
    })
        .email({
        message: "Enter a valid email adddress",
    }),
    password: zod_1.z
        .string({
        required_error: "Password is required.",
    })
        .min(5, "Password must be at least 5 characters"),
    gender: zod_1.z.enum(["male", "female"]),
    phone: zod_1.z.string().optional(),
    role: zod_1.z.enum(["ADMIN", "MODERATOR"]).default("MODERATOR"),
});
exports.default = exports.userSchema;
