import Conversation from "../models/conversation.js";
import Band from "../models/band.js";
import TextMessage from "../models/textMessage.js";



export async function create(req, res) {
    const { bandId } = req.body;
    try {
        let band = await Band.findById(bandId)
        if (!band) {
            return res.status(404).json({ message: "band not found" });
        }

        const conversation = await Conversation.create({
            band: band,
        }).catch((err) => {
            console.log(err.message)
            return res.status(400).json({ message: err.message });
        });

        await conversation.populate({
            path: 'band',
            model: 'Band',
            select: { 'name': 1, 'discription': 1, 'users': 1 },
            populate: {
                path: 'users',
                model: 'User',
                select: { 'firstname': 1, 'lastname': 1, 'imageId': 1 }
            }
        });

        return res.status(200).json({ message: "Conversation created successfully", conversation });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export async function getByBand(req, res) {
    const bandId = req.params.bandId;
    try {
        let conversation = await Conversation.findOne({ 'band': bandId })
            .populate({
                path: 'band',
                model: 'Band',
                select: { 'name': 1, 'discription': 1, 'users': 1 },
                populate: {
                    path: 'users',
                    model: 'User',
                    select: { 'firstname': 1, 'lastname': 1, 'imageId': 1 }
                }
            })
            .populate({
                path: 'textMessages',
                model: 'TextMessage',
                populate: {
                    path: 'sender',
                    model: 'User',
                    select: { 'firstname': 1, 'lastname': 1, 'imageId': 1 }
                }
            });

        if (!conversation) {
            return res.status(404).json({ message: "No conversation found for band" });
        }
        return res.status(200).json({ conversation });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ message: err.message });
    }
}

export async function addMessage(req, res) {
    try {
        const conversationId = req.body.conversationId
        const senderId = req.body.senderId;
        const text = req.body.text;

        const textMessage = await TextMessage.create({
            conversation: conversationId,
            sender: senderId,
            text: text
        }).catch((err) => {
            console.log(err)
            return res.status(400).json({ message: err.message });
        });

        textMessage.populate('sender', 'firstname lastname imageId');

        const conversation = await Conversation.findByIdAndUpdate(
            conversationId,
            { $addToSet: { textMessages: textMessage.id } },
            { new: true });

        if (!conversation) {
            res.status(404).json({ message: "conversation not found" });
        }

        return res.status(200).json({ textMessage });
    }
    catch (err) {
        console.log(err);
    }
}

export async function removeMessage(req, res) {
    const { textMessageId } = req.params;
    //console.log(textMessageId);

    try {
          let textMessage = await TextMessage.findById(textMessageId);
          if(!textMessage){
            return res.status(404).json({"message" : "text message not found"})
          }
        var conversation = await Conversation.findByIdAndUpdate(textMessage.conversation, { $pull: { textMessages: textMessageId } }, { new: true }).populate({
            path: 'textMessages',
            model: 'TextMessage'
        });
        await TextMessage.findByIdAndDelete(textMessage.id);

        res.status(200).json({ message: "message removed" })
    }
    catch (err) {
        res.status(500).json({ "message": err.message })
        console.log(err);
    }
}

export async function remove(req, res) {
    //console.log(req.params);
    try {
        const conversation = await Conversation
            .findByIdAndDelete(req.body.conversationId);

        if (!conversation) {
            res.status(404).json({ "message": "conversation not found" })
        }
        res.status(200).json({ "message": "Deleted conversation" })
    }
    catch (err) {
        res.status(500).json({ "message": err })
        console.log(err);
    }
}






