import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const likeSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        song: {
            type: Schema.Types.ObjectId,
            ref: 'Song',
            required: true
          },
    },
    {
        timestamps: true
    }
);

likeSchema.methods.toJSON = function() {
    var obj = this.toObject();
    return obj;
   }

export default model('Like', likeSchema);