import express from 'express';

import { signin, signup, verifyAccount, remove, sendCode ,verifyOTP, createNewPassword, modifyDetails } from '../controllers/userController.js';
import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router
  .route('/signin')
  .post(signin);

router
  .route('/signup')
  .post(signup);

  router
  .route('/verifyAccount/:id')
  .get(verifyAccount);
  
  //change password  
  router
  .route('/modifyDetails')
  .put(verifyToken, modifyDetails);

//forgot password  
  router
  .route('/forgotPassword/sendOtpMail')
  .post(sendCode);

  router
  .route('/forgotPassword/verifyOTP')
  .post(verifyOTP);

  router
  .route('/forgotPassword/createNewPassword')
  .put(createNewPassword);

//Delete User
router
  .route('/delete/:id')
  .delete(verifyToken, remove)

  
export default router;