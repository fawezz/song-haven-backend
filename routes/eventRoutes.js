import express from 'express';
import { add} from '../controllers/eventCntroller.js';

const router = express.Router();

router
  .route('/addEvent')
  .post(add);

  export default router;
