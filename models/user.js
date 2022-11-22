import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            minlength: 8,
            required: true
        },
        otpCode: {
            type: String,
            required: false,
            minlength: 5
        },
        isVerified: {
            type: Boolean,
            default: false,
          },
        imageId: {
            type: String
          },
          //Owner
        playlists: [{
            type: Schema.Types.ObjectId,
            ref: 'Playlist'
          }],
          //Creator
        songs: [{
            type: Schema.Types.ObjectId,
            ref: 'Song'
          }],
    },
    {
        timestamps: true
    }
);

userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    delete obj.otpCode;
    return obj;
   }

export default model('User', userSchema);