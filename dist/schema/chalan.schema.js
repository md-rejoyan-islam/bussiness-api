"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const chalanSchema = zod_1.z.object({
    id: zod_1.z.number(),
    chalanNumber: zod_1.z.number({
        required_error: "Chalan id is required",
        invalid_type_error: "Chalan id must be number",
    }),
    productId: zod_1.z
        .number({
        invalid_type_error: "Product id must be number",
    })
        .optional(),
    grayId: zod_1.z.number({
        required_error: "Gray id is required",
        invalid_type_error: "Gray id must be number",
    }),
    dyeingId: zod_1.z
        .number({
        invalid_type_error: "Dyeing id must be number",
    })
        .optional(),
});
exports.default = chalanSchema;
