import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const bandSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        nbrOfMembers: {
            type: Int,
            required: true
        }
    },
    {
        timestamps: true
    }
);


export default model('Band', bandSchema);