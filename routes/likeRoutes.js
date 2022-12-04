import express from 'express';
import { artistTotalLikes, isLikedByUser, toggleLike } from '../controllers/likeController.js';
import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router
  .route('/toggle')
  .post(toggleLike);

  router
  .route('/artistTotalLikes/:artistId')
  .get(artistTotalLikes);

// router
//   .route('/bySongId/:songId')
//   .delete(remove);
  
router
  .route('/islikedByUser')
  .post(isLikedByUser);

export default router;