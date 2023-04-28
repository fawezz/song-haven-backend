import multer, { diskStorage } from "multer";
import {join,dirname} from "path";
import {fileURLToPath} from "url";

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "video/mp4": "mp4"
};

export default multer({
    storage: diskStorage({
        destination: (req,file,callback) => {
            const __dirname = dirname(fileURLToPath(import.meta.url));
            callback(null,join(__dirname,"../uploads/images/band"));
        },
        filename:(req,file,callback) =>{
            const name = file.originalname.split(" ").join("_");
            const extension = MIME_TYPES[file.mimetype];
            callback(null,name + Date.now() + "." + extension);
        },
    }),

    limits: 10 * 1024 * 1024,
}).single("image");