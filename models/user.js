import { Schema, model } from "mongoose";

const userSchema = new Schema({
    androidID:{
        type: String,
        required: true,
        unique: true,
    },
    fcmToken:{
        type: String,
        required: true,
    },
    numberOfValidReport:{
        type: Number,
        required: true,
        default: 0,
    },
});

export default model('User', userSchema);
