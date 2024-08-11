import express from "express";
import validateRequest from "../middlewares/validationRequest";
import {
  createDyeing,
  deleteDyeingById,
  deleteDyeingPaymentById,
  dyeingPayment,
  getAllDyeings,
  getDyeingById,
  updateDyeingById,
  updateDyeingPaymentById,
} from "../controllers/dyeing.controller";
import { createDyeingZodSchema } from "../middlewares/validation/validation";

const dyeingRouter = express.Router();

dyeingRouter
  .route("/")
  .get(getAllDyeings)
  .post(validateRequest(createDyeingZodSchema), createDyeing);

// dyeing payment
dyeingRouter.route("/dyeing-payment").post(dyeingPayment);
dyeingRouter.route("/dyeing-payment/:id").patch(updateDyeingPaymentById);
dyeingRouter.route("/dyeing-payment/:id").delete(deleteDyeingPaymentById);

dyeingRouter
  .route("/:id")
  .get(getDyeingById)
  .put(updateDyeingById)
  .delete(deleteDyeingById);

// export dyeing router
export default dyeingRouter;
