import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const conversationSchema = new Schema(
    {
        band: {
            type: Schema.Types.ObjectId,
            ref: 'Band',
            required: true
        },
        textMessages: {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        },
                // users: [{
        //     type: Schema.Types.ObjectId,
        //     ref: 'User',
        // }],
    },
    {
        timestamps: true
    }
);

playlistSchema.methods.toJSON = function() {
    var obj = this.toObject();
    return obj;
   }

export default model('Conversation', conversationSchema);