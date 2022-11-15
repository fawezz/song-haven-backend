import express from 'express';

import { signin, signup, verifyAccount, remove, sendCode ,verifyOTP, createNewPassword, modifyDetails }
from '../controllers/userController.js';
import verifyToken from '../middlewares/authMiddleware.js';
import upload from '../middlewares/Upload.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - firstname
 *         - lastname
 *         - email
 *         - password
 *         - otpCode
 *         - isVerified
 *         - imageId
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of user
 *         firsstname:
 *           type: string
 *           description: firstname of user
 *         lastname:
 *           type: string
 *           description: lastname of user
 *         email:
 *           type: string
 *           descripton: email of user
 *         password:
 *          type: string
 *           description: password of user
 *         otpCode:
 *           type: string
 *           descripton: The Auto-generated otp code
 * 
 *         isVerified:
 *           type: bolean
 *           descripton: verification account 
 * 
 *         image:
 *           type:string
 *           description : profile image user
 *
 * 
 *       example:
 *         id: 1
 *         firstname: cyrine
 *         lastname: aouadhi
 *         email: cyrin@gmail.com
 *         password: abc
 *         otpCode: 256
 *         isVerified: true
 *         imageId: mldm
 *
 */

/**
 * @swagger 
 * /user/signin:
 *   user:
 *     summary: connected User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/User'
 *       
 *             
 *     responses:
 *       200:
 *         description: The user was successfully connected
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */  

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

//Delete User


router
  .route('/delete/:id')
  .delete(verifyToken, remove)

  
export default router;