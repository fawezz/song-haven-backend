import Playlist from "../models/playlist.js";
import Song from "../models/song.js";

export async function getByUser(req, res) {
    const userId= req.params.userId;
  try{
    let playlists = await Playlist.find({'owner': userId}).populate('songs');

    if (playlists.length == 0) {
      return res.status(404).json({message: "No playlists found"});
    }
      return res.status(200).json({playlists});
  }catch (err) {
    console.log(err);
    return res.status(500).json({message: err});
  }
}

export async function create(req, res) {
  const { ownerId, title, songs} = req.body;
  try{
    //let owner = await User.findById(userId)
    const newPlaylist = await Playlist.create({
        title: title,
        owner: ownerId,
        songs: songs
      }).catch((err) => {
        res.status('400').json({ message: err });
      });

    newPlaylist.populate('songs');
    res.status(200).json({ message: "Playlist created successfully", newPlaylist});
  } catch(err) {
        res.status(500).json({ error: err.message });
  }
}


export async function addSong(req, res) {
    try{
        const playlistId = req.body.playlistId
        const  songId = req.body.songId;

        const playlist = await Playlist.findByIdAndUpdate(playlistId, {$addToSet: {songs: songId}}, {new: true});
        if(!playlist){
            res.status(404).json({message : "playlist not found"});
        }
        playlist.save((err) => {
            if (err) {
            return res.status(400).json({ message: "An error occurred", error: err.message });
            }
        });

        return res.status(200).json({message : "Song Added Successfully", playlist});
    }
    catch (err){
        console.log(err);
    }
}

export async function removeSong(req, res) {
    //console.log(req.params);
    const { playlistId, songId} = req.body;
    try {
      let song = await Song.findById(songId);
      if(!song){
        return res.status(404).json({"message" : "song not found"})
      }
      var playlist = await Playlist.findByIdAndUpdate(playlistId, {$pull : {songs: songId}}, {new: true});
      res.status(200).json({message: "song removed", playlist})
    }
    catch (err){
      res.status(500).json({"message" : err.message})
      console.log(err);
    }
  }

export async function modifyPlaylist(req, res) {
  const { playlistId, title} = req.body;
  try{
    let playlist = await Playlist.findByIdAndUpdate(playlistId, {$set:{title: title}}, {new: true});
    if(playlist == null){
      res.status(404).json({ message: "playlist not found"});
    }else{
      res.status(201).json({ message: "playlist updated successfully", playlist });
    }
  } catch(err) {
        res.status(500).json({ message: err });
  }
}

export async function remove(req, res) {
  //console.log(req.params);
  try {
    const playlist = await Playlist
      .findByIdAndDelete(req.params.id);
      
    if(!playlist){
      res.status(404).json({message : "Playlist not found"})
    }
    res.status(200).json({"Deleted playlist": playlist})
  }
  catch (err){
    res.status(500).json({"message" : err})
    console.log(err);
  }
}






