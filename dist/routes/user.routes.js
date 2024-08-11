"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("../controllers/users.controllers ");
const validationRequest_1 = __importDefault(require("../middlewares/validationRequest"));
const validation_1 = require("../middlewares/validation/validation");
const userRouter = (0, express_1.Router)();
userRouter
    .route("/")
    .get(users_controllers_1.getAllUsers)
    .post((0, validationRequest_1.default)(validation_1.createUserZodSchema), users_controllers_1.createUser);
userRouter
    .route("/:id")
    .get(users_controllers_1.getUserById)
    .put(users_controllers_1.updateUserById)
    .delete(users_controllers_1.deleteUserById);
exports.default = userRouter;
