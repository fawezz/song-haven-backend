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
 *         firstname:
 *           type: string
 *           description: firstname of user
 *         lastname:
 *           type: string
 *           description: lastname of user
 *         email:
 *           type: string
 *           descripton: email of user
 *         password:
 *           type: string  
 *           description: user password
 *         otpCode: 
 *           type: string
 *           description: The Auto-generated otp of user
 *         isVerified:
 *           type: boolean
 *           description: account verification 
 *         imageId:
 *           type: string
 *           description: image of user 
 *             
 *   
 *       example:
 *         id: 1
 *         firstname: cyrine
 *         lastname: aouadhi
 *         email: cyrine@gmail.com
 *         password: abc
 *         otpCode: 12345
 *         isVerified: true
 *         imageId: abcdreez
 *
 */

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: User Connected
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user is connected
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

  /**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user is created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router
  .route('/signup')
  .post(signup);

/**
 * @swagger
 * /verifyAccount/{id}:
 *   get:
 *     summary: gets verification by id
 *     tags: [User]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: user id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: varification account by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: post can not be found
 */
  router
  .route('/verifyAccount/:id')
  .get(verifyAccount);
 
  
  /**
 * @swagger
 * /modifyDetails:
 *   put:
 *     summary: updates user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         decsription: The user was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: user was not found.
 *       500:
 *         description: Some errors happend.
 *
 */
  //modify profile
  router
  .route('/modifyDetails')
  .put(verifyToken,upload.single('image') ,modifyDetails);


/**
 * @swagger
 * /forgotPassword/sendOtpMail:
 *   post:
 *     summary: Otp sended
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: otp sensed succefully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
  router
  .route('/forgotPassword/sendOtpMail')
  .post(sendCode);

  
/**
 * @swagger
 * /forgotPassword/verifyOTP:
 *   post:
 *     summary: Otp verification
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: otp verified succefully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
  router
  .route('/forgotPassword/verifyOTP')
  .post(verifyOTP);

   /**
 * @swagger
 * /forgotPassword/createNewPassword:
 *   put:
 *     summary: updates Password
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         decsription: Password was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description:  error not found.
 *       500:
 *         description: Some errors happend.
 *
 */
  router
  .route('/forgotPassword/createNewPassword')
  .put(createNewPassword);

//Delete User

/**
 * @swagger
 *  /delete/{id}:
 *    delete:
 *      summary: Remove User
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: user id
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: User was deleted
 *        404:
 *          description: User was not found
 *
 */
router
  .route('/delete/:id')
  .delete(verifyToken, remove)

  
export default router;