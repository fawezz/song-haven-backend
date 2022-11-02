import express from 'express';

import { signin, signup, putOnce } from '../controllers/userController.js';
  
const router = express.Router();

router
  .route('/signin')
  .post(signin);

router
  .route('/signup')
  .post(signup);

//Update User
router
  .route('modify/:id')
  .put(putOnce);

//Delete User
router
  .route('delete/:id')
  .delete()

  
export default router;