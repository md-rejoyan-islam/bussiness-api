"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerPaymentSchema = exports.dyeingPaymentSchema = exports.grayPaymentSchema = void 0;
const zod_1 = require("zod");
const dyeing_schema_1 = __importDefault(require("./dyeing.schema"));
const gray_schema_1 = __importDefault(require("./gray.schema"));
const paymentSchema = zod_1.z.object({
    id: zod_1.z.number(),
    date: zod_1.z.date({
        required_error: "Payment date is required",
        invalid_type_error: "Payment date must be date",
    }),
    amount: zod_1.z.number({
        required_error: "Payment amount is required.",
        invalid_type_error: "Payment must be number",
    }),
    phone: zod_1.z.string({
        required_error: "Gray phone number is required.",
        invalid_type_error: "Gray name must be string.",
    }),
});
exports.default = paymentSchema;
exports.grayPaymentSchema = paymentSchema.extend({
    grayId: zod_1.z.number({
        required_error: "Gray Id is required.",
        invalid_type_error: "Gray Id must be number",
    }),
    gray: gray_schema_1.default.optional(),
});
exports.dyeingPaymentSchema = paymentSchema.extend({
    dyeingId: zod_1.z.number({
        required_error: "Dyeing Id is required.",
        invalid_type_error: "Dyeing Id must be number",
    }),
    dyeing: dyeing_schema_1.default.optional(),
});
exports.customerPaymentSchema = paymentSchema.extend({
    customerId: zod_1.z.number({
        required_error: "Customer Id is required.",
        invalid_type_error: "Customer Id must be number",
    }),
});
