import express from 'express';

import { create, getByUser, remove, getAll, modify } from '../controllers/songController.js';
import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();


router
  .route('/getAll')
  .get(getAll);

router
  .route('/getbyUser/:userId')
  .get(getByUser);

router
  .route('/create')
  .post(create);

  router
  .route('/modify')
  .put(modify);

router
  .route('/delete/:id')
  .delete(remove);
  
export default router;