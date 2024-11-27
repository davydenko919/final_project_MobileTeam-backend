import mongoose from "mongoose";

const waterSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 50,
        max: 15000,
    },
    time: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(v);
            },
            message: 'Invalid time format (should be hh:mm)',
        },
    },
    day: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(0[1-9]|[12]\d|3[01])$/.test(v);
            },
            message: 'Invalid day format (should be between 01 and 31)',
        },
    },
    month: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(0[1-9]|1[0-2])$/.test(v);
            },
            message: 'Invalid month format (should be between 01 and 12)',
        },
    },
    year: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{4}$/.test(v);
            },
            message: 'Invalid year format (should be a four-digit number)',
        },
    },
}, {
    timestamps: true,
    versionKey: false,
});

const Water = mongoose.model("Water", waterSchema);

export { Water };
