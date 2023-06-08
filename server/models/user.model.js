const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            required: true,
        },
        resetVerified: {
            type: Boolean,
            required: false
        },
        savedPosts: [{
            type: String
        }],
        submittedPosts: [{
            type: String
        }],
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model("UserModel", UserSchema);

module.exports = UserModel;
