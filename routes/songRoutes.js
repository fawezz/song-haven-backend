import express from 'express';

import { create, getByUser, remove, getAll, modify, searchSongs } from '../controllers/songController.js';
import { protect } from '../middlewares/authMiddleware.js';
import uploadSong from '../middlewares/uploadMusicMiddleware.js';


const router = express.Router();


router
  .route('/getAll')
  .get(getAll);

router
  .route('/getbyUser/:userId')
  .get(getByUser);

router
  .route('/create')
  .post(protect, uploadSong.single("music"), create);

  router
  .route('/modify')
  .put(modify);

router
  .route('/delete/:id')
  .delete(protect, remove);

router
  .route('/search')
  .post(searchSongs);
  
export default router;


/*
  router
  .route("/upload")
  .post(
    upload.fields([
      {
        name: "music",
        maxCount: 1,
      },
      {
        name: "image",
        maxCount: 1,
      },
    ]),
    create
  )
  */