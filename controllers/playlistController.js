import Playlist from "../models/playlist.js";
import Song from "../models/song.js";
import { Model } from "mongoose";

export async function getByUserId(req, res) {
    const userId= req.params.userId;
  try{
    const playlists = await Playlist.find({owner: userId});

    if (playlist.length == 0) {
      return res.status(204).json({message: "No playlists found"});
    }
      return res.status(200).json({playlists});
  }catch (err) {
    console.log(err);
    return res.status(500).json({message: err});
  }
}

export async function create(req, res) {
  const userId = req.body.userId;
  const title = req.body.title.toLowerCase();
  const songs = req.body.songs;
  try{
    const newPlaylist = await Playlist.create({
        title: title,
        owner: userId,
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

        const playlist = await Playlist.findById(playlistId);
        if(!playlist){
            res.status(404).json({message : "playlist not found"});
        }
        playlist.populate('songs');

        const song = await Song.findById(songId);
        playlist.songs.push(song)

        playlist.save((err) => {
            if (err) {
            res.status(400).json({ message: "An error occurred", error: err.message });
            process.exit(1);
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
      //const playlist = await playlist.findById(playlistId).populate('songs');
      var playlist;
      Model.findOne({'playlist.songs._id': songId}, function (err, result) {
        result.playlist.songs.id(id).remove();
        result.save();
        playlist =  result.playlist; 
    });
      res.status(200).json({message: "song removed", playlist})
    }
    catch (err){
      res.status(500).json({"message" : err})
      console.log(err);
    }
  }

export async function modifyPlaylist(req, res) {
  const { playlistId, newTitle} = req.body;
  try{
    let playlist = await Playlist.findById(playlistId);

    playlist.title = newTitle;
    playlist.save((err) => {
      if (err) {
        res
          .status(400)
          .json({ message: "An error occurred", error: err.message });
        process.exit(1);
      }
      res.status(201).json({ message: "playlist updated changed successfully", currentUser });
    });
  } catch(err) {
        res.status(500).json({ message: err });
  }
}









