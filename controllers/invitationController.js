import Invitation from "../models/invitation.js";
import User from "../models/user.js";
import Band from "../models/band.js";

export async function getInvitationByRecepId(req, res) {
  const userId = req.params.userId;
  try {
    let invitations = await Invitation.find({ 'recipient': userId })
    if (invitations.length == 0) {
      return res.status(404).json({ message: "No invitations found " });
    }
    return res.status(200).json({ invitations });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
}


export async function SendInvitation(req, res) {
  const { bandId, userId } = req.body;
  try {
    let invitation = Invitation.create(
      { requester: bandId, recipient: userId }
    )
    return res.status(200).json({ message: "Invitation sended Successfully", invitation });
  } catch (err) {
    console.log(err);
  }
}

export async function acceptedInvitation(req, res) {
  const { bandId, userId } = req.body;
  try {
    let invitation = await Invitation.findOne(
      { requester: bandId, recipient: userId }
    )
    invitation.status = "0"
    invitation.save()
    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    //add user to band
    const band = await Band.findByIdAndUpdate(bandId, { $addToSet: { users: userId } }, { new: true });
    if (!band) {
      res.status(404).json({ message: "band not found" });
    }
    band.save((err) => {
      if (err) {
        return res.status(400).json({ message: "An error occurred", error: err.message });
      }
    });

    return res.status(200).json({ message: "User Added Successfully", band });
  }
  catch (err) {
    console.log(err);
  }
}


export async function declineInvitation(req, res) {
  const { bandId, userId, invitationId } = req.body;

  try {
    let invitation = await Invitation.findOne(
      { requester: bandId, recipient: userId , invitation: invitationId}
    )
      invitation.status = "1"
      invitation.save()
    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    //delete user to band
    invitation = await Invitation
      .findByIdAndDelete(req.params.id);

    if (!invitation) {
    return  res.status(404).json({ message: "Invitation Not Nound" })
    }
    res.status(200).json({ "Deleted Invitation": invitation })
  }

  catch (err) {
    console.log(err);
  }
}

