import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const textMessageSchema = new Schema(
    {
        text: {
            type: String,
            required: true
        },
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        conversationId: {
            type: Schema.Types.ObjectId,
            ref: 'Conversation'
        },
    },
    {
        timestamps: true
    }
);

textMessageSchema.methods.toJSON = function() {
    var obj = this.toObject();
    return obj;
   }

export default model('TextMessage', textMessageSchema);