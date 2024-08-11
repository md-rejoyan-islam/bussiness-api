"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_routes_1 = __importDefault(require("../routes/product.routes"));
const buyer_routes_1 = __importDefault(require("../routes/buyer.routes"));
const seller_routes_1 = __importDefault(require("../routes/seller.routes"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const gray_routes_1 = __importDefault(require("../routes/gray.routes"));
const dyeing_routes_1 = __importDefault(require("../routes/dyeing.routes"));
const chalan_routes_1 = __importDefault(require("../routes/chalan.routes"));
const routes = [
    {
        path: "/api/v1/products",
        route: product_routes_1.default,
    },
    {
        path: "/api/v1/buyers",
        route: buyer_routes_1.default,
    },
    {
        path: "/api/v1/grays",
        route: gray_routes_1.default,
    },
    {
        path: "/api/v1/dyeings",
        route: dyeing_routes_1.default,
    },
    {
        path: "/api/v1/chalans",
        route: chalan_routes_1.default,
    },
    {
        path: "/api/v1/sellers",
        route: seller_routes_1.default,
    },
    {
        path: "/api/v1/auth",
        route: auth_routes_1.default,
    },
    {
        path: "/api/v1/users",
        route: user_routes_1.default,
    },
];
exports.default = routes;
