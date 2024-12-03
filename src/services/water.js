import createHttpError from "http-errors";
import { User } from "../db/models/user.js";
import { Water } from "../db/models/water.js";

export const addWater = async (userId, amount, date) => {
    const waterRecord = await Water.create({ userId, amount, date });
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


export const getWaterByDay = async (userId, date) => {
    const start = new Date(date.setHours(0, 0, 0, 0));
    const end = new Date(date.setHours((23, 59, 59, 999)));

    const records = await Water.find({
        userId,
        date: { $gte: start, $lte: end }
    });

    const totalAmount = records.reduce((acc, record) => acc + record.amount, 0);

    const user = User.findById({ userId });
    if (!user) {
        throw createHttpError(404, "User not found");
    }

    const dailyNorma = user.waterNorma;

    const percentage = Math.round((totalAmount / dailyNorma) * 100);

    return {
        records,
        totalAmount,
        percentage: `${percentage}%`,
        dailyNorma
    };
};
