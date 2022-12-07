import invitation from "../models/invitation.js";
import user from "../models/user.js";


export async function getInvById(req,res){
    invitation.findById()
        .then((invitation) => res.status(200).json(invitation))
        .catch ((error) =>  res.status(400).json(invitation))

}
////////SendInvitation//////////////


export async function sendInvitation(req,res){


  
}

///////delete Invitation//////
export async function removeIvitation(req, res) {
    try {
      const inv = await invitation
        .findByIdAndDelete(req.params.id);
        
      if(!inv){
        res.status(404).json({message : "Invitation Not Nound"})
      }
      res.status(200).json({"Deleted Invitation": inv})
    }
    catch (err){
      res.status(500).json({"message" : err})
      console.log(err);
    }
  }
