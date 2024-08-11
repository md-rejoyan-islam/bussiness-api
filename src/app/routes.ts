import productRouter from "../routes/product.routes";
import buyerRouter from "../routes/buyer.routes";
import sellerRouter from "../routes/seller.routes";
import userRouter from "../routes/user.routes";
import authRouter from "../routes/auth.routes";
import grayRouter from "../routes/gray.routes";
import dyeingRouter from "../routes/dyeing.routes";
import chalanRouter from "../routes/chalan.routes";

const routes = [
  {
    path: "/api/v1/products",
    route: productRouter,
  },
  {
    path: "/api/v1/buyers",
    route: buyerRouter,
  },
  {
    path: "/api/v1/grays",
    route: grayRouter,
  },
  {
    path: "/api/v1/dyeings",
    route: dyeingRouter,
  },
  {
    path: "/api/v1/chalans",
    route: chalanRouter,
  },
  {
    path: "/api/v1/sellers",
    route: sellerRouter,
  },
  {
    path: "/api/v1/auth",
    route: authRouter,
  },
  {
    path: "/api/v1/users",
    route: userRouter,
  },
];

// export routes
export default routes;
