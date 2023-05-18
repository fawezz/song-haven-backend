import mongoose from 'mongoose';
const { Schema , model } = mongoose;

const LocationSchema = mongoose.Schema({


    coordinates: {
      type: [Number,Number],
    
    }
 
});

LocationSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.timestamps;
    return obj;
   }


export default model('location', LocationSchema);