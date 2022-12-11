import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const bandSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        discription: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        users: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
    },

    {
        timestamps: true
    }
);

bandSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.timestamps;
    return obj;
   }


export default model('Band', bandSchema);
