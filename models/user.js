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
            minlength: 4
        },
        isVerified: {
            type: Boolean,
            default: false,
          },
    },
    {
        timestamps: true
    }
);

userSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.password;
    return obj;
   }

export default model('User', userSchema);