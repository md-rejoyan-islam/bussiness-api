"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const buyer_controllers_1 = require("../controllers/buyer.controllers ");
const buyerRouter = express_1.default.Router();
buyerRouter.route("/").get(buyer_controllers_1.getAllBuyers).post(buyer_controllers_1.createBuyer);
buyerRouter
    .route("/:id")
    .get(buyer_controllers_1.getBuyerById)
    .put(buyer_controllers_1.updateBuyerById)
    .delete(buyer_controllers_1.deleteBuyerById);
exports.default = buyerRouter;
