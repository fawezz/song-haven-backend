import Like from "../models/like.js";
import Song from "../models/song.js";
import User from "../models/user.js";



export async function toggleLike(req, res) {
    try{
        const {userId, songId} = req.body
        const liked = await Like.findOne({user: userId, song: songId});

        if(liked == null){
            const like = await Like.create({
                user: userId,
                song: songId
              }).catch((err) => {
                return res.status('400').json({ "message": err });
              });
    
            return res.status(200).json({liked : true});
        }
        else{
            await Like.findByIdAndDelete(liked.id);
            return res.status(200).json({liked : false});
        }
    }
    catch (err){
        console.log(err);
        return res.status(500).json("error");

    }
}

export async function isLikedByUser(req, res) {
    try{
        const {userId, songId} = req.body
        const liked = await Like.findOne({user: userId, song: songId});

        if(liked == null){
            return res.status(200).json({liked : false});
        }
        else{
            return res.status(200).json({liked : true});
        }
    }
    catch (err){
        console.log(err);
        return res.status(500).json("error");

    }
}

export async function artistTotalLikes(req, res) {
    try{
        var totalLikes = 0
        const userId = req.params.artistId
        const artist = await User.findById(userId);
        if(artist == null)
        {
            return res.status(404).json({"message" : "user not found"});
        }
        const artistSongs = await Song.find({creator: userId})
        for(const item of artistSongs){ 
            await Like.find({song : item}).count().then((x) =>
                {
                    totalLikes += x
                    console.log(totalLikes)
                }
            )
            console.log("returned");
        }
        return res.status(200).json({"totalLikes" : totalLikes});
    }
    catch (err){
        console.log(err.message);
        return res.status(500).json({ "error": err.message });

    }
}
