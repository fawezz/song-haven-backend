import band from '../models/band.js';
import user from '../models/user.js';
import Upload from "../middlewares/Upload.js";

export async function create(req, res) {
  const { creatorId, name, discription, nbrOfMembers} = req.body;

  
  try{
   
    const newBand = await band.create({
        name: name,
        discription: discription,
        creator: creatorId,
       // nbrOfMembers : nbrOfMembers ,
      }).catch((err) => {
        return res.status('400').json({ message: err.message });
      });
    newBand.populate('creator');
    res.status(200).json({ message: "Band created successfully", newBand});
  } catch(err) {
        res.status(500).json({ error: err.message });
  }

}

export async function getByUser(req, res) {
    const userId= req.params.userId;
  try{
    let bands = await band.find({'creator': userId}).populate('creator', 'firstname lastname');
    if (bands.length == 0) {
      return res.status(404).json({message: "No bands found for this user"});
    }
      return res.status(200).json({bands});
  }catch (err) {
    console.log(err);
    return res.status(500).json({message: err.message});
  }
}


export async function getAll(req, res) {
  
  try{
    let bands = await band.find().limit(20).populate('creator', 'firstname lastname');

    if (bands.length == 0) {
      return res.status(404).json({message: "No bands found"});
    }
      return res.status(200).json({bands});
  }catch (err) {
    console.log(err);
    return res.status(500).json({message: err.message});
  }
}


export async function modify(req, res) {
    const { id, name, discription} = req.body;
    try{
      let bnd = await band.findById(id);
  
      bnd.name = name;
      bnd.discription = discription;
      bnd.imageFilename = req.file.imageFilename
    
      bnd.save((err) => {
        if (err) {
          res
            .status(400)
            .json({ message: "An error occurred", error: err.message });
          process.exit(1);
        }
        res.status(201).json({ message: "band details changed successfully", bnd });
      });
  
    } catch(err) {
          res.status(500).json({ error: err });
    }
  }
  

export async function addUser(req,res){
    try{
        const bandId = req.body.bandId
        const  userId = req.body.userId;

        const band = await band.findByIdAndUpdate(bandId, {$addToSet: {Users: userId}}, {new: true});
        if(!band){
            res.status(404).json({message : "user not found"});
        }
        band.save((err) => {
            if (err) {
            return res.status(400).json({ message: "An error occurred", error: err.message });
            }
        });

        return res.status(200).json({message : "user Added Successfully", band});
    }
    catch (err){
        console.log(err);
    }
}

export async function remove(req, res) {
    try {
        const band = await band
          .findByIdAndDelete(req.params.id);
          

        if(!band){
          res.status(404).json({message : "band not found"})
        }
        res.status(200).json({"Deleted band": band})
      }
      catch (err){
        res.status(500).json({"message" : err.message})
        console.log(err);
      }

  }

  export async function saveImage(req, res) {
    console.log("changing image")
    const email = req.body.email.toLowerCase();
    try{
      let currentUser = await user.findOne({'email': email});
        try {
          currentUser.imageId = req.file.filename;
          currentUser.save()
          res.status(201).json({ message: "Image Uploaded", imageId: req.file.filename});
     } catch (error) {
         console.log(error)
         res.status(400).json({ message: error });
     }
      
    } catch(error) {
          res.status(500).json({ message: error });
    }
  }



