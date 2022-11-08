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
        gender: {
            type: String,
            required: false
        },
        role: {
            type: String,
            default: "Basic",
            required: true
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