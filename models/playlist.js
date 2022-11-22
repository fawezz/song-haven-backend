import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const playlistSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        songs: [{
            type: Schema.Types.ObjectId,
            ref: 'Song'
          }],
    },
    {
        timestamps: true
    }
);

playlistSchema.methods.toJSON = function() {
    var obj = this.toObject();
    return obj;
   }

export default model('Playlist', playlistSchema);