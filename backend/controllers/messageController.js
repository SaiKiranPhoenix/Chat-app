const Message = require('../models/Message');

const sendMessage = async (req, res) => {
    const { sender, receiver, content } = req.body;

    try {
        const message = new Message({ sender, receiver, content });
        await message.save();
        res.status(201).json({ message });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getMessages = async (req, res) => {
    const { sender, receiver } = req.query;

    try {
        const messages = await Message.find({
            $or: [
                { sender, receiver },
                { sender: receiver, receiver: sender }
            ]
        }).sort({ timestamp: 1 });

        res.json({ messages });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { sendMessage, getMessages };
