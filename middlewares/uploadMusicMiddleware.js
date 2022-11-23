import path from 'path';
import multer from 'multer';

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./uploads/music")
    },
  filename: function (req, file, callback) {
    let ext = path.extname(file.originalname)
    callback(null, "music" + Date.now() + ext)
  }
})

const uploadSong = multer({
    preservePath: true,
    storage: storage
});

export default uploadSong;