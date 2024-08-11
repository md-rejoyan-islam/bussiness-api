"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gray_controller_1 = require("../controllers/gray.controller");
const validationRequest_1 = __importDefault(require("../middlewares/validationRequest"));
const validation_1 = require("../middlewares/validation/validation");
const grayRouter = express_1.default.Router();
grayRouter
    .route("/")
    .get(gray_controller_1.getAllGrays)
    .post((0, validationRequest_1.default)(validation_1.createGrayZodSchema), gray_controller_1.createGray);
grayRouter.route("/gray-payment").post(gray_controller_1.grayPayment);
grayRouter.route("/gray-payment/:id").patch(gray_controller_1.updateGrayPaymentById);
grayRouter.route("/gray-payment/:id").delete(gray_controller_1.deleteGrayPaymentById);
grayRouter
    .route("/:id")
    .get(gray_controller_1.getGrayById)
    .put(gray_controller_1.updateGrayById)
    .delete(gray_controller_1.deleteGrayById);
exports.default = grayRouter;
