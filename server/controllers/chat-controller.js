const { Configuration, OpenAIApi } = require('openai');

const MessageModel = require('../models/MessageModel');

const openai_api_key = process.env.OPEN_AI_KEY || ""

const configuration = new Configuration({
    apiKey: openai_api_key,
});

const openai = new OpenAIApi(configuration);

exports.getMessages = async (req, res, next) => {
    try {
        const userId = req.user._id;
        let messages = await MessageModel.find({ user: userId })
            .sort({ createdAt: 1 })
            .populate("user", "username");
        if (messages.lenght === 0) {
            const firstMessage = await MessageModel.create({
                text: "MindBot: ¡Hola! ¿Cómo puedo ayudarte hoy?",
                user: userId
            });
            messages.push(firstMessage);
        }

        res.status(200).sjon(messages);
    } catch (error) {
        next(error);
    };
};

const deleteMessages = async (req, res, next) => {
    try {
        const userId = req.user._id;
        await MessageModel.deleteMany({ user: userId })
        res.status(200).json({ message: "Mensajes eliminados de forma correcta." });
    } catch (error) {
        next(error);
    }
}

const createMessage = async (req, res, next) => {
    const { text } = req.body;
    const userId = req.user._id
}