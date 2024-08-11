"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productAddToDyeingZodSchema = exports.createChalanZodSchema = exports.createProductZodSchema = exports.createDyeingZodSchema = exports.createGrayZodSchema = exports.resetPasswordZodSchema = exports.forgotPasswordZodSchema = exports.loginZodSchema = exports.createUserZodSchema = void 0;
const zod_1 = require("zod");
const user_schema_1 = __importDefault(require("../../schema/user.schema"));
const gray_schema_1 = __importDefault(require("../../schema/gray.schema"));
const dyeing_schema_1 = __importDefault(require("../../schema/dyeing.schema"));
const product_schema_1 = __importDefault(require("../../schema/product.schema"));
const chalan_schema_1 = __importDefault(require("../../schema/chalan.schema"));
exports.createUserZodSchema = zod_1.z.object({
    body: user_schema_1.default.omit({
        id: true,
    }),
});
exports.loginZodSchema = zod_1.z.object({
    body: user_schema_1.default.pick({
        password: true,
        email: true,
    }),
});
exports.forgotPasswordZodSchema = zod_1.z.object({
    body: user_schema_1.default.pick({
        email: true,
    }),
});
exports.resetPasswordZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        code: zod_1.z
            .string({
            required_error: "Code is required.",
            invalid_type_error: "Code must be string",
        })
            .min(5, "Code must be 5 characters"),
        newPassword: zod_1.z
            .string({
            required_error: "New password is required.",
        })
            .min(5, "Password must be at least 5 characters"),
        oldPassword: zod_1.z
            .string({
            required_error: "Old password is required.",
        })
            .min(5, "Password must be at least 5 characters"),
    })
        .refine((data) => {
        if (data.newPassword !== data.oldPassword)
            return false;
        return true;
    }, "New password and Old password doesn't match."),
});
exports.createGrayZodSchema = zod_1.z.object({
    body: gray_schema_1.default.omit({
        id: true,
    }),
});
exports.createDyeingZodSchema = zod_1.z.object({
    body: dyeing_schema_1.default.omit({
        id: true,
    }),
});
exports.createProductZodSchema = zod_1.z.object({
    body: product_schema_1.default.omit({
        id: true,
    }),
});
exports.createChalanZodSchema = zod_1.z.object({
    body: chalan_schema_1.default.omit({
        id: true,
    }),
});
exports.productAddToDyeingZodSchema = zod_1.z.object({
    body: product_schema_1.default
        .pick({
        dyeing_date: true,
        dyeing_rate: true,
        thaan_amount: true,
    })
        .extend({
        productId: zod_1.z.number({
            required_error: "Product id is required",
            invalid_type_error: "Product id must be number",
        }),
        dyeingId: zod_1.z.number({
            required_error: "Dyeing id is required",
            invalid_type_error: "Dyeing id must be number",
        }),
    }),
});
