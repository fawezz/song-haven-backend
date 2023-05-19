import express from 'express';

import { addSong, create, getByUser, modifyPlaylist, remove, removeSong } from '../controllers/playlistController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();


router
  .route('/getbyUser/:userId')
  .get(getByUser);

router
  .route('/create')
  .post(protect, create);

router
  .route('/addSong')
  .put(protect ,addSong);

router
  .route('/removesong')
  .put(protect, removeSong)

  router
  .route('/modify')
  .put(modifyPlaylist);

router
  .route('/delete/:id')
  .delete(remove);
  
export default router;