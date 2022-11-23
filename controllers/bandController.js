import band from "../models/band";
import invitation from "../models/band";

export async function getAllBands (req, res){
    band.findAll()
      .then((bands) => res.status(200).json(bands))
      .catch((error) => res.status(400).json({error}));
}


export async function createBand(req, res){
    var newBand = new band(req.name);
    newEvent.save(function (err, event) {
      if (err) {
         res.send(err); }
      res.status(200)
        .json({
          status: 'success',
          message: 'Band created successfully'
        });
    });
  }



  export async function removeBand(req, res) {
    //console.log(req.params);
    try {
      const bd = await Ba
        .findByIdAndDelete(req.params.id);
        
      if(!usr){
        res.status(404).json({message : "No such user found"})
      }
      res.status(200).json({"Deleted user": usr})
    }
    catch (err){
      res.status(500).json({"message" : err})
      console.log(err);
    }
  }
 export async function removeband (req, res) {
    band.remove({ _id: req.params.band_id }, function (err, result) {
      if (err) { return err; }
      res.status(200)
        .json({
          status: 'success',
          message: 'band removed'
        });
    });
  }
  
  





