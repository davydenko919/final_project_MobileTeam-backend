import createHttpError from "http-errors";
import { addWater, deleteWater, patchWater } from "../services/water.js";

export const addWaterController = async (req, res) => {
    const userId = req.user._id;
    const { amount, time, day, month, year } = req.body;

    if (!amount || !time || !day || !month || !year) {
        throw createHttpError(400, "Bad request, please fill all fields!");
    }

    const addedWater = await addWater(userId, amount, time, day, month, year);

    res.status(201).json({
        status: 201,
        message: "Successfully added water!",
        data: addedWater,
    });
};

export const patchWaterController = async (req, res, next) => {
    const userId = req.user._id;
    const { id } = req.params;

    const result = await patchWater(userId, id, { ...req.body });

    if (!result) {
        next(createHttpError(404, "Water record not found!"));
        return;
    }

    res.json({
        status: 200,
        message: "Successfully edit water record!",
        data: result,
    });
};

export const deleteWaterController = async (req, res, next) => {
    const userId = req.user._id;
    const { id } = req.params;

    const result = await deleteWater(userId, id);

    if (!result) {
        next(createHttpError(404, "Water record not found!"));
        return;
    }

    res.status(204).send();
};
