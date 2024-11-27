import createHttpError from "http-errors";
import { Water } from "../db/models/water.js";

export const addWater = async (userId, amount, time, day, month, year) => {
    const [hour, minute] = time.spit(":").map(Number);

    if (hour > 23 || hour < 0 ||
        minute > 59 || minute < 0 ||
        isNaN(hour) || isNaN(minute)) {
        throw createHttpError(400, "Bad request, invalid time format.");
    }

    const waterRecord = await Water.create({ userId, amount, time, day, month, year });

    return waterRecord;
};


export const patchWater = async (userId, id, payload) => {
    const editedWater = await Water.findOneAndUpdate(
        { _id: id, userId },
        payload,
        { new: true });

    return editedWater;
};


export const deleteWater = async (userId, id) => {
    const deletedWater = await Water.findByIdAndDelete({ _id: id, userId });
    return deletedWater;
};
