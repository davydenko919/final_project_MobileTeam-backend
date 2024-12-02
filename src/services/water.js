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
