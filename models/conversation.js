import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const conversationSchema = new Schema(
    {
        band: {
            type: Schema.Types.ObjectId,
            ref: 'Band',
            required: true
        },
        textMessages: [{
            type: Schema.Types.ObjectId,
            ref: 'TextMessage'
        }],
        // users: [{
        //     type: Schema.Types.ObjectId,
        //     ref: 'User',
        // }],
    },
    {
        timestamps: true
    }
);

conversationSchema.methods.toJSON = function() {
    var obj = this.toObject();
    return obj;
   }

export default model('Conversation', conversationSchema);