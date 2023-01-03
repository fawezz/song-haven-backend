import express from 'express';
import { addEvent,modify,remove,getAll, getByUser} from '../controllers/eventCntroller.js';

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

  router
  .route('/getByCreator/:userId')
  .get(getByUser);



  export default router;

  





