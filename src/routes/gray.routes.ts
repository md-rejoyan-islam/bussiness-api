import express from "express";
import {
  createGray,
  deleteGrayById,
  deleteGrayPaymentById,
  getAllGrays,
  getGrayById,
  grayPayment,
  updateGrayById,
  updateGrayPaymentById,
} from "../controllers/gray.controller";
import validateRequest from "../middlewares/validationRequest";
import { createGrayZodSchema } from "../middlewares/validation/validation";

const grayRouter = express.Router();

grayRouter
  .route("/")
  .get(getAllGrays)
  .post(validateRequest(createGrayZodSchema), createGray);

// gray payment
grayRouter.route("/gray-payment").post(grayPayment);
grayRouter.route("/gray-payment/:id").patch(updateGrayPaymentById);
grayRouter.route("/gray-payment/:id").delete(deleteGrayPaymentById);

grayRouter
  .route("/:id")
  .get(getGrayById)
  .put(updateGrayById)
  .delete(deleteGrayById);

// export gray router
export default grayRouter;
