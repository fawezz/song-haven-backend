import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export async function signup(req, res) {

  try{
    const { firstname, lastname, email, password, role, gender } = req.body;
    const oldUser = await User.findOne({email});

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const  encryptedPassword = await bcrypt.hash(password, 10);

    const currentUser = await User.create({
            firstname: firstname.toLowerCase(),
            lastname: lastname.toLowerCase(),
            email: email.toLowerCase(), 
            password: encryptedPassword,
            gender,
            role
          }).catch((err) => {
            res.status(500).json({ error: err });
          });

          const newToken = jwt.sign(
            { user_id: currentUser._id, email: currentUser.email},
            process.env.SECRET_KEY,
            {
              expiresIn: "4h",
            }
          );

      return res.status(200).json({message: "user created", token: newToken, currentUser});
  }catch (err) {
    console.log(err);
  }

}


export async function signin(req, res) {
  try{
    const { email, password} = req.body;
    const currentUser = await User.findOne({ email });

    if (currentUser && (await bcrypt.compare(password, currentUser.password))) {
      
      const newToken = jwt.sign(
        { user_id: currentUser._id, email: currentUser.email},
        process.env.SECRET_KEY,
        {
          expiresIn: "4h",
        }
      );

      return res.status(200).json({message : "login avec succeés", token: newToken, currentUser});
    }
    else{
      if(!currentUser){
        res.status(400).json({message : "No such user exists"});
      }else{
        res.status(401).json({message : "wrong password"});
      }
    }
  } catch (err){
    console.log(err);
  }
}


export function putOnce(req, res) {
    User
    .findByIdAndUpdate(req.params.id, req.body)
    .then(doc1 => {
        User.findById(req.params.id)
          .then((doc2) => {
            res.status(200).json(doc2);
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
}

export function remove(req, res) {
  User
  .findByIdAndDelete(req.params.id, req.body)
  .then(doc => {
    res.status(200).json("Deleted user : ", doc);
  })
  .catch(err => {
      res.status(500).json({ error: err });
  });
}
