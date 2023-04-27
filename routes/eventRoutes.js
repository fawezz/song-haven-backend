import express from 'express';
import { addEvent,modify,remove,getAll, getByUser} from '../controllers/eventCntroller.js';

import{protect} from '../middlewares/authMiddleware.js';
const router = express.Router();

router
  .route('/addEvent')
  .post(addEvent);

  router
  .route('/modify')
  .put(modify);

  
  router
  .route('/deleteEvent/:id')
  .delete(remove);
/*
  router
  .route('/getByCreator/:userId')
  .get(getByUser);
*/


  router
  .route('/getByCreator')
  .get(protect,getByUser);




  export default router;

  





