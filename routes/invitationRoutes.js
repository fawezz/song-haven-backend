import express from 'express';
import {declineInvitation,acceptedInvitation,SendInvitation,getInvitationByRecepId }
from '../controllers/invitationController.js';
const router = express.Router();
  
router
.route('/sendInvitation')
  .post(SendInvitation)

router


  .route('/acceptedInvitation')
  .put(acceptedInvitation)



router
  .route('/declineInvitation')
  .put(declineInvitation)

  router
  .route('/getByUser/:userId')
  .get(getInvitationByRecepId);

export default router;
