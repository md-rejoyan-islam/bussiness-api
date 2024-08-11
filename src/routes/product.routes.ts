import express from "express";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  productAddToDyeing,
  thaanCountAddToProduct,
  updateProductById,
} from "../controllers/product.controllers";
import {
  createProductZodSchema,
  productAddToDyeingZodSchema,
} from "../middlewares/validation/validation";
import validateRequest from "../middlewares/validationRequest";

const productRouter = express.Router();

productRouter
  .route("/")
  .get(getAllProducts)
  .post(validateRequest(createProductZodSchema), createProduct);

// product add to dyeing
productRouter
  .route("/add-to-dyeing")
  .patch(validateRequest(productAddToDyeingZodSchema), productAddToDyeing);

// thaan add
productRouter.route("/add-thaan").post(thaanCountAddToProduct);

productRouter
  .route("/:id")
  .get(getProductById)
  .patch(updateProductById)
  .delete(deleteProductById);

// export product router
export default productRouter;
