"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const thaanSchema = zod_1.z.object({
    productId: zod_1.z
        .number({
        required_error: "Product id  is required",
        invalid_type_error: "Product id must be number",
    })
        .min(1, "Product id must be at least 1 character"),
    customerProductId: zod_1.z
        .number({
        invalid_type_error: "Customer  id must be number",
    })
        .optional(),
    amount: zod_1.z
        .number({
        required_error: "Thaan amount  is required",
        invalid_type_error: "Thaan amount must be number",
    })
        .min(1, "Thaan amount must be at least 1 character"),
    defect: zod_1.z
        .number({
        invalid_type_error: "Thaan defect must be number",
    })
        .optional(),
    is_sold: zod_1.z
        .boolean({
        invalid_type_error: "is_sold must be boolean",
    })
        .default(false),
});
exports.default = thaanSchema;
