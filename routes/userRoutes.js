import express from 'express';

import { signin, signup, verifyAccount, remove, sendCode ,verifyOTP, createNewPassword, modifyDetails, ResendWelcomeMail, saveImage, searchByName, getById } from '../controllers/userController.js';
import verifyToken from '../middlewares/authMiddleware.js';
import uploadUserImage from '../middlewares/uploadImageMiddleware.js';
import sharp from 'sharp';

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
  //.put(verifyToken, modifyDetails);
  .put(modifyDetails);

  router
  .route('/profileImage')
  //.put(verifyToken, modifyDetails);
  .post(uploadUserImage.single("image"), saveImage);

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

//Resend Welcome Mail
  router
  .route('/resendWelcomeMail')
  .post(ResendWelcomeMail);

//Delete User
router
  .route('/delete/:id')
  .delete(verifyToken, remove)

  router
  .route('/searchByName')
  .post(searchByName);
  
  router
  .route('/getById')
  .post(getById);

export default router;