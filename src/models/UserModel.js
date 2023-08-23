import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
    {
        // name: { type: String, required: true },
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, require: true },
        phone: { type: String },
        address: { type: String },
        avatar: { type: String },
        city: { type: String },
        // phone: { type: String, required: true },
        access_token: { type: String, required: false },
        refresh_token: { type: String, required: false },
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model('User', userSchema);
module.exports = User;
