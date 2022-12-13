import mongoose from 'mongoose';
const { Schema , model } = mongoose;

const LocationSchema = mongoose.Schema({

    type: {
      type: String, 
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number,Number],
      required: true
    }
 
});

const eventSchema = mongoose.Schema({
      eventname: {
        type: String,
        require: false,
      },
      date: {
        type: Date,
        required:false
      },
      creator : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
      }, 
      band : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'band'
      },  
      location: {
        type:String,
        required: false
      },
      adresse:{
        type: String
      },
    },
  );

  eventSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj.timestamps;
    return obj;
   }


export default model('event', eventSchema);


