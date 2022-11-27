

/*
export async function create(req, res) {
  const { creatorId, name, discription} = req.body;
  try{
    const newBand = await band.create({
        name: name,
        discription: discription,
        creator: creatorId
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
  const { bandId, name, description} = req.body;
  try{
    let band = await band.findByIdAndUpdate(bandId, {$set:{name: name, description: description}}, {new: true});
    if(band == null){
      res.status(404).json({ message: "band not found"});
    }else{
      res.status(201).json({ message: "band updated successfully", band});
    }
  } catch(err) {
        res.status(500).json({ message: err.message });
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

*/



