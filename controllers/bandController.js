import Band from '../models/band.js';
import User from '../models/user.js';

export const add = (req, res) => {
  let bnd = new Band({
    name: req.body.name,
    discription: req.body.discription,
    creator: req.body.creatorId,
  })

  if (req.file) {
    bnd.image = req.file.path
  }
  bnd.save()
    .then(response => {
      bnd.populate('creator');
      res.json({ message: 'Band Added successfuly!!' })
    })
    .catch(error => {
      res.json({
        message: 'An error occured'
      })
    })

}
export async function getByUser(req, res) {
  const userId = req.params.userId;
  try {
    let bands = await Band.find({ 'creator': userId }).populate('creator', 'firstname lastname').populate("");
    if (bands.length == 0) {
      return res.status(404).json({ message: "No bands found for this user" });
    }
    return res.status(200).json({ bands });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}

export async function getAll(req, res) {
  try {
    let bands = await Band.find().limit(20).populate('creator', 'firstname lastname');

    if (bands.length == 0) {
      return res.status(404).json({ message: "No bands found" });
    }
    return res.status(200).json({ bands });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}

export async function modify(req, res) {
  const { bandId, name, discription, image } = req.body;
  try {
    let band = await Band.findByIdAndUpdate(bandId,
      {
        $set: {
          name,
          discription,
          image
        }
      });
    if (band == null) {
      res.status(404).json({ message: "band not found" });
    } else {
      res.status(201).json({ message: "band updated successfully", band });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

export async function addUser(req, res) {
  try {
    const bandId = req.body.bandId
    const userId = req.body.userId;

    const band = await Band.findByIdAndUpdate(bandId, { $addToSet: { users: userId } }, { new: true });
    if (!band) {
      res.status(404).json({ message: "band not found" });
    }
    band.save((err) => {
      if (err) {
        return res.status(400).json({ message: "An error occurred", error: err.message });
      }
    });

    return res.status(200).json({ message: "band Added Successfully", band });
  }
  catch (err) {
    console.log(err);
  }
}


export async function remove(req, res) {
  try {
    const band = await Band
      .findByIdAndDelete(req.params.id);

    if (!band) {
      res.status(404).json({ "message": "Band not found" })
    }
    res.status(200).json({ "message": "Deleted band" })
  }
  catch (err) {
    res.status(500).json({ "message": err })
    console.log(err);
  }
}

export async function removeUser(req, res) {

  const { bandId, userId } = req.body;
  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ "message": "user not found" })
    }
    var newBand = await Band.findByIdAndUpdate(bandId, { $pull: { users: userId } }, { new: true }).populate({
      path: 'users',
      model: 'User'
    });

    res.status(200).json({ message: "user removed", newBand })
  }
  catch (err) {
    res.status(500).json({ "message": err.message })
    console.log(err);
  }
}