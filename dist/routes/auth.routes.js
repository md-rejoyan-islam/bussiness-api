"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const verify_1 = require("../middlewares/verify");
const validationRequest_1 = __importDefault(require("../middlewares/validationRequest"));
const validation_1 = require("../middlewares/validation/validation");
const authRouter = (0, express_1.Router)();
authRouter
    .route("/forgot-password")
    .post(verify_1.isLoggedOut, (0, validationRequest_1.default)(validation_1.forgotPasswordZodSchema), auth_controller_1.forgotPassword);
authRouter
    .route("/reset-password")
    .post(verify_1.isLoggedOut, (0, validationRequest_1.default)(validation_1.resetPasswordZodSchema), auth_controller_1.resetPassword);
authRouter
    .route("/login")
    .post(verify_1.isLoggedOut, (0, validationRequest_1.default)(validation_1.loginZodSchema), auth_controller_1.userLogin);
authRouter.route("/logout").post(verify_1.isLoggedIn, auth_controller_1.userLogout);
authRouter.route("/me").get(verify_1.isLoggedIn, auth_controller_1.loggedInUser);
exports.default = authRouter;
