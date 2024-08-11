"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const dyeingSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z
        .string({
        required_error: "Dyeing name is required",
        invalid_type_error: "Dyeing name must be string",
    })
        .min(3, "Dyeing name must be at least 3 character"),
    address: zod_1.z
        .string({
        required_error: "Dyeing address is required.",
        invalid_type_error: "Dyeing address must be string",
    })
        .min(3, "Dyeing address must be at least 3 character"),
    phone: zod_1.z
        .string({
        required_error: "Dyeing phone number is required.",
        invalid_type_error: "Dyeing name must be string.",
    })
        .min(8, "Dyeing phone must be at least 8 character"),
});
exports.default = dyeingSchema;
