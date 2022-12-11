import express from 'express';
import { addMessage, create, getByBand, remove, removeMessage } from '../controllers/conversationController.js';
import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();


router
  .route('/getbyBand/:bandId')
  .get(getByBand);

router
  .route('/create')
  .post(create);

router
  .route('/addMessage')
  .put(addMessage);

router
  .route('/removeMessage')
  .put(removeMessage)

router
  .route('/delete/:id')
  .delete(remove);
  
export default router;