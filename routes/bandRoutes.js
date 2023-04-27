import express from 'express';
import { getAll, getByUser, remove, modify, addUser, add, removeUser } from '../controllers/bandController.js';
import uploadBandImage from '../middlewares/Upload.js';
import{protect} from '../middlewares/authMiddleware.js';


const router = express.Router();

router
  .route('/getAllBand')
  .get(getAll);

router
  .route('/getByUser')
  .get(protect,getByUser);

router
  .route('/modify')
  .put(modify);

router
  .route('/createBand')
  .post(uploadBandImage.single('image'), add);

router
  .route('/addArtiste')
  .put(addUser)

  router
  .route('/removeArtist')
  .put(removeUser)

router
  .route('/delete/:id')
  .delete(remove);

export default router;

