const mongoose = require('mongoose');

const SecuritySchema = mongoose.Schema(
    {
        otp: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: false
        },
        phone: {
            type: String,
            required: false
        },
        createdAt: {
            type: Date,
            expires: "2m",
            default: Date.now()
        }
    }
);

const SecurityModel = mongoose.model("SecurityModel", SecuritySchema);

module.exports = SecurityModel;