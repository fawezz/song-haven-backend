import express from 'express';

import { signin, signup, remove, modifyRole, modifyPassword, modifyDetails } from '../controllers/userController.js';
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
  .route('/modifyRole/:id')
  .put(verifyToken, modifyRole);
  
  //change password  
  router
  .route('/modifyDetails')
  .put(verifyToken, modifyDetails);

//change password  
  router
  .route('/modifyPassword')
  .put(verifyToken, modifyPassword);

//Delete User
router
  .route('/delete/:id')
  .delete(verifyToken, remove)

  
export default router;