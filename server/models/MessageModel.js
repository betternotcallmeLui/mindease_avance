const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel",
            required: true
        }
    },
    {
        timestamps: true
    }
)

const MessageModel = mongoose.Model("MessageModel", MessageSchema);
module.exports = MessageModel;