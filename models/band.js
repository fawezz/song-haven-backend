import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const bandSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        nbrOfMembers: {
            type: Number,
            required: false,
            default : '56'
        },
        discription:{
            type : String,
            require : true
        },

        imageFilename: {
            type: String
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
const Band = mongoose.model('Band', bandSchema)

export default model('Band', bandSchema);
