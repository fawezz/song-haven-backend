import Playlist from "../models/playlist.js";
import Song from "../models/song.js";
import user from "../models/user.js";



export async function create(req, res) {
  var {title, genre } = req.body; //, duration
  const creatorId = req.user.id
  title = title.replace(/"/g, ''); // removing quotes
  genre = genre.replace(/"/g, '');
  try {
    const newSong = await Song.create({
      title: title,
      genre: genre,
      filename: req.file.filename,
      creator: creatorId,
      //duration: duration
    }).catch((err) => {
      return res.status(400).json( err.message );
    });
    newSong.populate('creator');
    return res.status(200).json("Song created successfully");  /*, newSong */
  } catch (err) {
    return res.status(500).json(err.message);
  }
}

export async function getByUser(req, res) {
  const userId = req.params.userId;
  try {
    let songs = await Song.find({ 'creator': userId }).populate('creator', 'firstname lastname');
    if (songs.length == 0) {
      return res.status(404).json({ message: "No songs found for this user" });
    }
    return res.status(200).json( songs );
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.message );
  }
}

export async function getAll(req, res) { // ordered by descending creation date
  try {
    let songs = await Song.find().sort({ createdAt: -1 }).populate('creator', 'firstname lastname');

    if (songs.length == 0) {
      return res.status(404).json({ message: "No songs found" });
    }
    return res.status(200).json( songs );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}

export async function modify(req, res) {
  const { songId, title, genre } = req.body;
  try {
    let song = await Song.findByIdAndUpdate(songId, { $set: { title: title, genre: genre } }, { new: true });
    if (song == null) {
      res.status(404).json({ message: "song not found" });
    } else {
      res.status(201).json({ message: "song updated successfully", song });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function remove(req, res) {
  try {
    const song = await Song
      .findByIdAndDelete(req.params.id);
    //delete the mp3 file also

    if (!song) {
      res.status(404).json("song not found")
    }
    res.status(200).json("song deleted successfully")
    //,"song": song})
  }
  catch (err) {
    res.status(500).json(err.message)
    console.log(err);
  }
}

export async function searchSongs(req, res) {
  try {
    const { criteria, searchText } = req.body;
    var songs;
    if (criteria.toLowerCase() == "title") {
      songs = await Song.find({ title: new RegExp('.*' + searchText.toLowerCase() + '.*') })
        .populate('creator', 'firstname lastname');
    } else {
      if (criteria.toLowerCase() == "genre") {
        songs = await Song.find({ genre: new RegExp('.*' + searchText.toLowerCase() + '.*') })
          .populate('creator', 'firstname lastname');
      } else {
        return res.status(404).json({ message: "invalid criteria" })
      }
    }
    if (songs.length != 0) {
      return res.status(200).json( songs );
    } else {
      return res.status(200).json(songs);
    }
  }
  catch (err) {
    console.log(err);
    return res.status(500).json(err.message);

  }
}



