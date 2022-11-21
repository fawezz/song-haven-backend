import path from 'path';
import multer from 'multer';

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/images/')
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, "image" + Date.now() + ext)
    }
})

var upload = multer ({
    storage: storage,
    fileFilter: function(req, file, callback){
        if(
            file.mimetype == "image/png" || 
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" 
        ){
            callback(null, true)
        } else{
            console.log('only png, jpeg and jpg are supported')
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

export default upload;