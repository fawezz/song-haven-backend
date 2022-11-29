import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const songSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            //required: true
        },
        genre: {
            type: String,
            required: true
        },
        filename: {
            type: String,
            required: true
        },
        imageFilename: {
            type: String,
            required: false
        },
        isPublished: {
            type: Boolean,
            required: true,
            default: true
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);

songSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.isPublished;
    return obj;
   }

export default model('Song', songSchema);