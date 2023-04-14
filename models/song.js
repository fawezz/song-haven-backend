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
            enum: ['pop', 'rock', 'hiphop', 'country', 'electronic', 'jazz', 'blues', 'classical', 'reggae', 'r&b', 'folk', 'heavy metal', 'punk', 'indie', 'world music', 'gospel', 'alternative', 'ambient', 'bluegrass', 'classical crossover', 'dance', 'edm', 'funk', 'grunge', 'house', 'latin', 'new age', 'opera', 'progressive rock', 'soul', 'techno', 'trance'],
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