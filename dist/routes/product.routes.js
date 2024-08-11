"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controllers_1 = require("../controllers/product.controllers");
const validation_1 = require("../middlewares/validation/validation");
const validationRequest_1 = __importDefault(require("../middlewares/validationRequest"));
const productRouter = express_1.default.Router();
productRouter
    .route("/")
    .get(product_controllers_1.getAllProducts)
    .post((0, validationRequest_1.default)(validation_1.createProductZodSchema), product_controllers_1.createProduct);
productRouter
    .route("/add-to-dyeing")
    .patch((0, validationRequest_1.default)(validation_1.productAddToDyeingZodSchema), product_controllers_1.productAddToDyeing);
productRouter.route("/add-thaan").post(product_controllers_1.thaanCountAddToProduct);
productRouter
    .route("/:id")
    .get(product_controllers_1.getProductById)
    .patch(product_controllers_1.updateProductById)
    .delete(product_controllers_1.deleteProductById);
exports.default = productRouter;
