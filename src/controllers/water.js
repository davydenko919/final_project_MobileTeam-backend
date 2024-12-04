import createHttpError from "http-errors";
import { addWater, deleteWater, getWaterByDay, getWaterByMonth, patchWater } from "../services/water.js";

export const addWaterController = async (req, res) => {
    const userId = req.user.id;
    const { amount, date } = req.body;

    if (!amount || !date) {
        throw createHttpError(400, "Bad request, please fill all fields!");
    }

    const addedWater = await addWater(userId, amount, date);

    res.status(201).json({
        status: 201,
        message: "Successfully added water!",
        data: addedWater,
    });
};

// export const patchWaterController = async (req, res, next) => {
//     const userId = req.user._id;
//     const { id } = req.params;

//     const result = await patchWater(userId, id, { ...req.body });

//     if (!result) {
//         next(createHttpError(404, "Water record not found!"));
//         return;
//     }

//     res.json({
//         status: 200,
//         message: "Successfully edit water record!",
//         data: result,
//     });
// };

export const patchWaterController = async (req, res, next) => {
    const { id } = req.params;

    const result = await patchWater(id, { ...req.body });

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

// export const deleteWaterController = async (req, res, next) => {
//     const userId = req.user._id;
//     const { id } = req.params;

//     const result = await deleteWater(userId, id);

//     if (!result) {
//         next(createHttpError(404, "Water record not found!"));
//         return;
//     }

//     res.status(204).send();
// };

export const deleteWaterController = async (req, res, next) => {
    const { id } = req.params;

    const result = await deleteWater(id);

    if (!result) {
        next(createHttpError(404, "Water record not found!"));
        return;
    }

    res.status(204).send();
};

export const getWaterByDayController = async (req, res, next) => {
    const userId = req.user._id;
    const date = req.params;

    if (!date) {
        throw createHttpError(400, "Date is required!");
    }

    const data = await getWaterByDay(userId, date);

    res.json({
        status: 200,
        message: "Successfully fetched water data!",
        data: {
            records: data.records,
            totalAmount: data.totalAmount,
            percentage: data.percentage,
            dailyNorma: data.dailyNorma,
        }
    });
};

export const getWaterByMonthController = async (req, res, next) => {
    const userId = req.user._id;
    const date = req.params;

    if (!date) {
        throw createHttpError(400, "Date is required!");
    }

    const result = await getWaterByMonth(userId, date);

    res.json({
        status: 200,
        message: "Successfully fetched water data!",
        data: result
    });
};

// export const getWaterController = async (req, res, next) => {
//     res.json({
//         status: 200,
//         message: "Successfully get water!",
//         data: [
//             { amount: 120, userId: 1, date: "2024-11-01T12:34:56" },
//             { amount: 340, userId: 2, date: "2024-11-02T09:45:23" },
//             { amount: 280, userId: 3, date: "2024-11-03T15:12:34" },
//             { amount: 420, userId: 4, date: "2024-11-04T08:23:45" },
//             { amount: 250, userId: 5, date: "2024-11-05T18:54:12" },
//             { amount: 150, userId: 6, date: "2024-11-06T10:32:56" },
//             { amount: 500, userId: 7, date: "2024-11-07T14:16:43" },
//             { amount: 310, userId: 8, date: "2024-11-08T06:47:21" },
//             { amount: 400, userId: 9, date: "2024-11-09T21:34:05" },
//             { amount: 290, userId: 10, date: "2024-11-10T11:56:39" },
//             { amount: 130, userId: 11, date: "2024-11-11T08:25:18" },
//             { amount: 480, userId: 12, date: "2024-11-12T19:14:32" },
//             { amount: 320, userId: 13, date: "2024-11-13T15:07:52" },
//             { amount: 260, userId: 14, date: "2024-11-14T20:38:49" },
//             { amount: 180, userId: 15, date: "2024-11-15T22:41:30" },
//             { amount: 200, userId: 16, date: "2024-11-16T09:26:17" },
//             { amount: 360, userId: 17, date: "2024-11-17T07:14:52" },
//             { amount: 270, userId: 18, date: "2024-11-18T16:02:41" },
//             { amount: 220, userId: 19, date: "2024-11-19T12:11:59" },
//             { amount: 410, userId: 20, date: "2024-11-20T18:47:28" },
//             { amount: 190, userId: 21, date: "2024-11-21T05:33:20" },
//             { amount: 450, userId: 22, date: "2024-11-22T13:42:10" },
//             { amount: 380, userId: 23, date: "2024-11-23T06:54:09" },
//             { amount: 340, userId: 24, date: "2024-11-24T11:39:15" },
//             { amount: 170, userId: 25, date: "2024-11-25T14:25:35" },
//             { amount: 410, userId: 26, date: "2024-11-26T08:19:44" },
//             { amount: 220, userId: 27, date: "2024-11-27T17:50:29" },
//             { amount: 500, userId: 28, date: "2024-11-28T19:22:12" },
//             { amount: 240, userId: 29, date: "2024-11-29T10:45:56" },
//             { amount: 260, userId: 30, date: "2024-11-30T12:35:43" },

//         ],
//     });
// };

