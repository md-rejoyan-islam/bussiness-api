"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const seller_controllers_1 = require("../controllers/seller.controllers ");
const sellerRouter = express_1.default.Router();
sellerRouter.route("/").get(seller_controllers_1.getAllSellers).post(seller_controllers_1.createSeller);
sellerRouter
    .route("/:id")
    .get(seller_controllers_1.getSellerById)
    .put(seller_controllers_1.updateSellerById)
    .delete(seller_controllers_1.deleteSellerById);
exports.default = sellerRouter;
