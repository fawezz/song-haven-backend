import express from 'express';

import { signin, signup, verifyAccount, remove, sendCode ,verifyOTP, createNewPassword, modifyDetails, getAll }
from '../controllers/userController.js';
import verifyToken from '../middlewares/authMiddleware.js';
import upload from '../middlewares/Upload.js';

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
 

  router
  .route('/modifyDetails')
  .put(verifyToken,upload.single('image') ,modifyDetails);



  router
  .route('/forgotPassword/sendOtpMail')
  .post(sendCode);


  router
  .route('/forgotPassword/verifyOTP')
  .post(verifyOTP);

  router
  .route('/forgotPassword/createNewPassword')
  .put(createNewPassword);

router
  .route('/delete/:id')
  .delete(verifyToken, remove)

router
.route("/all",getAll)
.get(getAll)
  
export default router;