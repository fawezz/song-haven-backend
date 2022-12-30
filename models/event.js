import mongoose from 'mongoose';
import location from '../models/location.js';

const { Schema , model } = mongoose;



const eventSchema = mongoose.Schema({
      title: {
        type: String,
        require: false,
      },
      dateEvent: {
        type: Date,
        required:false
      },
      description: {
        type: String,
        require: false,
      },
    
      owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'band'
      },  

      location: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'location'
       
      },
     
    },
  );

  eventSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.timestamps;
    return obj;
   }


export default model('event', eventSchema);


