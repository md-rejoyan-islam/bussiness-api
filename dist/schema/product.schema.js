"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const zod_1 = require("zod");
const payment_schema_1 = require("./payment.schema");
exports.productSchema = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z
        .string({
        required_error: "Product name is required",
        invalid_type_error: "Product name must be string",
    })
        .min(2, "Product name must be at least 2 character"),
    grayId: zod_1.z
        .number({
        required_error: "Gray id is required.",
        invalid_type_error: "Gray id must be number",
    })
        .min(1, "Gray id must be at least 1 character"),
    gray_amount: zod_1.z
        .number({
        required_error: "Gray amount is required.",
        invalid_type_error: "Gray amount must be number",
    })
        .min(1, "Gray amount must be at least 1 character"),
    gray_rate: zod_1.z
        .number({
        required_error: "Gray rate is required.",
        invalid_type_error: "Gray rate must be number",
    })
        .min(1, "Gray rate must be at least 1 character"),
    gray_date: zod_1.z
        .date({
        invalid_type_error: "Gray date must be date type",
    })
        .optional(),
    gray_payment_status: zod_1.z
        .boolean({
        invalid_type_error: "Gray payment status must be boolean",
    })
        .default(false),
    gray_payments: payment_schema_1.grayPaymentSchema.optional(),
    dyeingId: zod_1.z
        .number({
        invalid_type_error: "Dyeing id must be number",
    })
        .min(1, "Dyeing id must be at least 1 character")
        .optional(),
    dyeing_rate: zod_1.z
        .number({
        invalid_type_error: "Dyeing rate must be number",
    })
        .min(1, "Dyeing rate must be at least 1 character")
        .optional(),
    dyeing_date: zod_1.z
        .date({
        invalid_type_error: "Dyeing date must be date type",
    })
        .optional(),
    thaan_amount: zod_1.z
        .number({
        invalid_type_error: "Thaan amount must be number",
    })
        .min(1, "Thaan amount must be at least 1 character")
        .optional(),
    dyeing_payment_status: zod_1.z
        .boolean({
        invalid_type_error: "Dyeing payment status must be boolean",
    })
        .default(false),
    dyeing_payments: payment_schema_1.dyeingPaymentSchema.optional(),
    chalanId: zod_1.z
        .number({
        invalid_type_error: "Chalan id must be number",
    })
        .min(1, "Chalan id  must be at least 1 character")
        .optional(),
    delivery_status: zod_1.z.enum(["IN_MILL", "IN_HOUSE", "RUNNING"]).optional(),
});
exports.default = exports.productSchema;
