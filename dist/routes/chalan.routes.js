"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chalan_controller_1 = require("../controllers/chalan.controller");
const validation_1 = require("../middlewares/validation/validation");
const validationRequest_1 = __importDefault(require("../middlewares/validationRequest"));
const chalanRouter = express_1.default.Router();
chalanRouter
    .route("/")
    .get(chalan_controller_1.getAllChalans)
    .post((0, validationRequest_1.default)(validation_1.createChalanZodSchema), chalan_controller_1.createChalan);
chalanRouter
    .route("/:id")
    .get(chalan_controller_1.getChalanById)
    .put(chalan_controller_1.updateChalanById)
    .delete(chalan_controller_1.deleteChalanById);
exports.default = chalanRouter;
