import express from 'express';
import { getAll, getByUser,remove,modify,addUser,saveImage, add}
from '../controllers/bandController.js';
import upload from '../middlewares/Upload.js';

const router = express.Router();

router
.route('/getAllBand')
.get(getAll);


router
.route('/getByUser/:id')
.get(getByUser);

router
  .route('/modify')
  .put(modify);

router
  .route('/createBand')
  .post(upload.single('image'),add);

  router
  .route('/addArtiste')
  .post(addUser)

router
    .route('/delete/:id')
    .delete(remove);

  export default router;

