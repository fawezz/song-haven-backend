import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const invitationSchema = new Schema(
    {
        status: {
            enum: [0 //accept
                ,1//decline
                ,2 //pending
            ],
            type: String,
            required: true,
            default: 2
        },
        
            requester: { 
                type: Schema.Types.ObjectId,
                 ref: 'Band'},
        
            recipient: {
                 type: Schema.Types.ObjectId, 
                 ref: 'User'},
    },
    {
        timestamps: true
    }
);
export default model('Invitation', invitationSchema);