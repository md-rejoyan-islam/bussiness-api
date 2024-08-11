import { z } from "zod";

const thaanSchema = z.object({
  productId: z
    .number({
      required_error: "Product id  is required",
      invalid_type_error: "Product id must be number",
    })
    .min(1, "Product id must be at least 1 character"),
  customerProductId: z
    .number({
      invalid_type_error: "Customer  id must be number",
    })
    .optional(),
  amount: z
    .number({
      required_error: "Thaan amount  is required",
      invalid_type_error: "Thaan amount must be number",
    })
    .min(1, "Thaan amount must be at least 1 character"),
  defect: z
    .number({
      invalid_type_error: "Thaan defect must be number",
    })
    .optional(),
  is_sold: z
    .boolean({
      invalid_type_error: "is_sold must be boolean",
    })
    .default(false),
});

export default thaanSchema;
