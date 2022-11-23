import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const invitationSchema = new Schema(
    {
        status: {
            enum: ['Pending','Accepted','Decline'],
            type: String,
            required: true
        },
        Sender: {
            type: Int,
            required: true
        },
        recever: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);


export default model('Invitation', invitationSchema);