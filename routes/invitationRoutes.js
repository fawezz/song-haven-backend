import express from 'express';
import { getAllInvitations, removeIvitation }
from '../controllers/invitationController.js';
const router = express.Router();


router
.route('/getAllInv')
.get(getAllInvitations)



router
  .route('/deleteInv/:id')
  .delete(removeIvitation)

  
export default router;
