"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validationRequest_1 = __importDefault(require("../middlewares/validationRequest"));
const dyeing_controller_1 = require("../controllers/dyeing.controller");
const validation_1 = require("../middlewares/validation/validation");
const dyeingRouter = express_1.default.Router();
dyeingRouter
    .route("/")
    .get(dyeing_controller_1.getAllDyeings)
    .post((0, validationRequest_1.default)(validation_1.createDyeingZodSchema), dyeing_controller_1.createDyeing);
dyeingRouter.route("/dyeing-payment").post(dyeing_controller_1.dyeingPayment);
dyeingRouter.route("/dyeing-payment/:id").patch(dyeing_controller_1.updateDyeingPaymentById);
dyeingRouter.route("/dyeing-payment/:id").delete(dyeing_controller_1.deleteDyeingPaymentById);
dyeingRouter
    .route("/:id")
    .get(dyeing_controller_1.getDyeingById)
    .put(dyeing_controller_1.updateDyeingById)
    .delete(dyeing_controller_1.deleteDyeingById);
exports.default = dyeingRouter;
