import express from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { addWaterController, deleteWaterController, patchWaterController } from "../controllers/water.js";
import { addWaterSchema, patchWaterSchema } from "../validation/water.js";
import { isValidId } from "../middlewares/isValidId.js";

const waterRouter = express.Router();
const jsonParser = express.json();


waterRouter.post(
    "/",
    jsonParser,
    validateBody(addWaterSchema),
    ctrlWrapper(addWaterController)
);

waterRouter.patch(
    "/:id",
    isValidId,
    jsonParser,
    validateBody(patchWaterSchema),
    ctrlWrapper(patchWaterController)
);

waterRouter.delete(
    "/:id",
    isValidId,
    ctrlWrapper(deleteWaterController)
);
