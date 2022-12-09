import band from '../models/band.js';
import user from '../models/user.js';
import Upload from "../middlewares/Upload.js";
import { response } from 'express';



  export const add = (req, res,next)=>{
    let bnd = new band({
      name : req.body.name,
      discription : req.body.discription,
      creator : req.body.creatorId,
    })

    if (req.file){
      bnd.image = req.file.path
    }
    bnd.save()
    .then(response => {
      bnd.populate('creator');
      res.json( { message : 'Band Added successfuly!!'


      })
    })
    .catch(error => {
      res.json({
        message : 'An error occured'

      })
    })
   
  }
export async function getByUser(req, res) {
    const userId= req.params.userId;
  try{
    let bands = await band.find({'creator': userId}).populate('creator', 'firstname lastname').populate("");
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
    const bnd = await band
      .findByIdAndDelete(req.params.id);
      
    if(!bnd){
      res.status(404).json({"message" : "Band not found"})
    }
    res.status(200).json({"message" : "Deleted band"})
  }
  catch (err){
    res.status(500).json({"message" : err})
    console.log(err);
  }
}
  export async function saveImage(req, res) {
    console.log("changing image")
    const name = req.body.name.toLowerCase();
    try{
      let currentUser = await user.findOne({'name': name});
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



