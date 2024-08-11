import express from "express";
import {
  createBuyer,
  deleteBuyerById,
  getAllBuyers,
  getBuyerById,
  updateBuyerById,
} from "../controllers/buyer.controllers ";

const buyerRouter = express.Router();

buyerRouter.route("/").get(getAllBuyers).post(createBuyer);

buyerRouter
  .route("/:id")
  .get(getBuyerById)
  .put(updateBuyerById)
  .delete(deleteBuyerById);

// export buyer router
export default buyerRouter;
