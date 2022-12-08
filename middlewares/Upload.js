import path from 'path';
import multer from 'multer';

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/images/band')
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

var uploadBandImage = multer ({
    //dest:'upload',
    storage: storage,
    fileFilter: function(req, file, callback){
        if(
            file.mimetype == "image/png" || 
            file.mimetype == "image/jpg"
        ){
            callback(null, true)
        } else{
            console.log('only png and jpg are supported')
            callback(null, false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

export default uploadBandImage;
 