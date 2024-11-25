import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender:{
        type: String,
        enum: ["woman", "man",],
        default: "woman"
    },
    weight: {
        type: Number,
    },
    sportHours: {
        type: Number,
    },
    photo: {
        type: String,
    },
},{
    versionKey: false, timestamps: true,
});

userSchema.methods.toJSON = function(){
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

const User = mongoose.model("User", userSchema);

export { User };
