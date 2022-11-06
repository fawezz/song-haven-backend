import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../middlewares/nodemailMiddleware.js";

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
            sendEmail(currentUser.email, "new account confirmation ","new account has been created", "132");
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


export async function modifyRole(req, res) {
  const id = req.params.id;
  const role = req.body.role;
  try{
    let usr = await User.findById(id);

    usr.role = role;
    usr.save((err) => {
      //Monogodb error checker
      if (err) {
        res
          .status(400)
          .json({ message: "An error occurred", error: err.message });
        process.exit(1);
      }
      res.status(201).json({ message: "Update successful", usr });
    });

  } catch(err) {
        res.status(500).json({ error: err });
  }
}

export async function remove(req, res) {
  //console.log(req.params);
  try {
    const usr = await User
      .findByIdAndDelete(req.params.id);
      
    if(!usr){
      res.status(404).json({message : "No such user found"})
    }
    res.status(200).json({"Deleted user": usr})
  }
  catch (err){
    res.status(500).json({"message" : err})
    console.log(err);
  }
}
