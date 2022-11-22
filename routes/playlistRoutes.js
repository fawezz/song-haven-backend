import express from 'express';

import { addSong, create, getByUser, modifyPlaylist, remove, removeSong } from '../controllers/playlistController.js';
import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();


router
  .route('/getbyUser/:userId')
  .get(getByUser);

router
  .route('/create')
  .post(create);

router
  .route('/addSong')
  .put(addSong);

router
  .route('/removesong')
  .put(removeSong)

  router
  .route('/modify')
  .put(modifyPlaylist);

router
  .route('/delete/:id')
  .delete(remove);
  
export default router;