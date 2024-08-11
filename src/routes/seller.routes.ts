import express from "express";
import {
  createSeller,
  deleteSellerById,
  getAllSellers,
  getSellerById,
  updateSellerById,
} from "../controllers/seller.controllers ";

const sellerRouter = express.Router();

sellerRouter.route("/").get(getAllSellers).post(createSeller);

sellerRouter
  .route("/:id")
  .get(getSellerById)
  .put(updateSellerById)
  .delete(deleteSellerById);

// export seller router
export default sellerRouter;
