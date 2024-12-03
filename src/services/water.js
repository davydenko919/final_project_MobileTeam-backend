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
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours((23, 59, 59, 999)));

    const records = await Water.find({
        userId,
        date: {
            $gte: startOfDay,
            $lte: endOfDay
        }
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


export const getWaterByMonth = async (userId, date) => {
    const inputDate = new Date(date);
    const startOfMonth = new Date(inputDate.getFullYear(), inputDate.getMonth(), 1);
    const endOfMonth = new Date(inputDate.getFullYear(), inputDate.getMonth() + 1, 1);

    const records = Water.find({
        userId,
        date: {
            $gte: startOfMonth,
            $lt: endOfMonth
        }
    });
    return records;
};
