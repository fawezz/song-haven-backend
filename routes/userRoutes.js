import express from 'express';

import { signin, signup, modify, remove } from '../controllers/userController.js';
import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router
  .route('/signin')
  .post(signin);

router
  .route('/signup')
  .post(signup);

//Update User
router
  .route('/modify/:id')
  .put(verifyToken, modify);

//Delete User
router
  .route('/delete/:id')
  .delete(verifyToken, remove)

  
export default router;