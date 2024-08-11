"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_errors_1 = __importDefault(require("http-errors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const responseHandler_1 = require("../helper/responseHandler");
const errorHandler_1 = require("../middlewares/errorHandler");
const cors_2 = __importDefault(require("../config/cors"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)(cors_2.default));
app.use((0, morgan_1.default)("dev"));
app.get("/", (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, responseHandler_1.successResponse)(res, {
        statusCode: 200,
        message: "Api is running successfully.",
    });
})));
routes_1.default.forEach((router) => {
    app.use(router.path, router.route);
});
app.use((0, express_async_handler_1.default)(() => __awaiter(void 0, void 0, void 0, function* () {
    throw http_errors_1.default.NotFound("Could not find this route.");
})));
app.use(errorHandler_1.errorHandler);
exports.default = app;
