import express from "express";
import {
  createChalan,
  deleteChalanById,
  getAllChalans,
  getChalanById,
  updateChalanById,
} from "../controllers/chalan.controller";
import { createChalanZodSchema } from "../middlewares/validation/validation";
import validateRequest from "../middlewares/validationRequest";

const chalanRouter = express.Router();

chalanRouter
  .route("/")
  .get(getAllChalans)
  .post(validateRequest(createChalanZodSchema), createChalan);

chalanRouter
  .route("/:id")
  .get(getChalanById)
  .put(updateChalanById)
  .delete(deleteChalanById);

// export buyer router
export default chalanRouter;
