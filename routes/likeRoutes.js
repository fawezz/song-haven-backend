import express from 'express';
import { artistTotalLikes, isLikedByUser, toggleLike } from '../controllers/likeController.js';
import{protect} from '../middlewares/authMiddleware.js';

import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router
  .route('/toggle')
  .post(protect, toggleLike);

  router
  .route('/artistTotalLikes')
  .get(protect, artistTotalLikes);

// router
//   .route('/bySongId/:songId')
//   .delete(remove);
  
router
  .route('/islikedByUser')
  .post(protect, isLikedByUser);

export default router;