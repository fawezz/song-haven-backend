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
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        fileName: {
            type: String,
            required: true
        },
        isPublished: {
            type: Boolean,
            required: true
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