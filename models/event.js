import mongoose from 'mongoose';
const { Schema , model } = mongoose;

const LocationSchema = mongoose.Schema({

 
    coordinates: {
      type: [Number,Number],
    
    }
 
});

const eventSchema = mongoose.Schema({
      title: {
        type: String,
        require: false,
      },
      dateEvent: {
        type: String,
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
        type:LocationSchema
       
      },
     
    },
  );

  eventSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.timestamps;
    return obj;
   }


export default model('event', eventSchema);


