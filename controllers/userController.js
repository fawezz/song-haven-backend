import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {sendWelcomeEmail, sendOtpEmail} from "../middlewares/nodemailMiddleware.js";
import generateOTP from "../middlewares/otpMiddleware.js";

export async function signup(req, res) {

  try{
    const { firstname, lastname, password} = req.body;
    const email = req.body.email.toLowerCase()
    const oldUser = await User.findOne({email});

    if (oldUser) {
      return res.status(409).json({message: "Email Already Exists"});
    }

    const  encryptedPassword = await bcrypt.hash(password, 10);

    const otpCode = generateOTP();
    const currentUser = await User.create({
            firstname: firstname.toLowerCase(),
            lastname: lastname.toLowerCase(),
            email: email.toLowerCase(), 
            password: encryptedPassword,
            otpCode: otpCode,
            imageId: "defaultImage.png"
          }).catch((err) => {
            return res.status('400').json({ message: err });
          });

          const newToken = jwt.sign(
            { user_id: currentUser._id, email: currentUser.email},
            process.env.SECRET_KEY,
            {
              expiresIn: "4h",
            }
          );
            sendWelcomeEmail(currentUser.email, currentUser._id);
      return res.status(200).json({message: "account created", token: newToken, currentUser});
  }catch (err) {
    console.log(err);
    return res.status(500).json({message: err});
  }

}

export async function verifyAccount(req, res) {
  const id = req.params.id;
  try{
    let currentUser = await User.findById(id);
    if(!currentUser.isVerified){
      currentUser.isVerified = true;
      currentUser.save((err) => {
        if (err) {
          res
            .status(400)
            .json({ message: "An error occurred", error: err.message });
          process.exit(1);
        }
        res.status(200).json({ message: "Your account has been verified successfully"});
      });
    }else{
      res.status(404).json({ message: "link expired"});
    }
    

  } catch(err) {
        res.status(500).json({ error: err });
  }
}


export async function signin(req, res) {
  try{
    const email = req.body.email.toLowerCase()
    const  password = req.body.password;

    const currentUser = await User.findOne({ 'email': email });

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
        res.status(400).json({message : "No such user exists, please signUp"});
      }else{
        res.status(401).json({message : "wrong password"});
      }
    }
  } catch (err){
    console.log(err);
  }
}

export async function modifyDetails(req, res) {
  const { id, firstname, lastname, password} = req.body;
  try{
    let currentUser = await User.findById(id);

    currentUser.firstname = firstname;
    currentUser.lastname = lastname;
    if(password.length !== 0){
      const  encryptedPassword = await bcrypt.hash(password, 10);
      currentUser.password = encryptedPassword;
    }


    currentUser.save((err) => {
      if (err) {
        res
          .status(400)
          .json({ message: "An error occurred", error: err.message });
        process.exit(1);
      }
      res.status(201).json({ message: "account details changed successfully", currentUser });
    });

  } catch(err) {
        res.status(500).json({ message: err });
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

////////////////////////////////////////////////forgot password Scenario////////////////////////////////

export async function sendCode(req, res) {
  const email = req.body.email.toLowerCase();
  try{
    let currentUser = await User.findOne({'email': email});
    if(currentUser){
      sendOtpEmail(currentUser.email, currentUser.otpCode);
      res.status(200).json({ message: "Please check your email"});
    }else{
      res.status(404).json({ message: "Invalid email adress"});
    }
    
  } catch(err) {
        res.status(500).json({ error: err });
  }
}

export async function verifyOTP(req, res) {
  const email = req.body.email.toLowerCase();
  const otp = req.body.otpCode;
  try{
    let usr = await User.findOne({ 'email': email },);
    if(usr && usr.otpCode == otp){
      const otpNew = generateOTP();
      usr.otpCode = otpNew;
      usr.save((err) => {
        if (err) {
          res
            .status(400)
            .json({ message: "An error occurred", error: err.message });
          process.exit(1);
        }
      });
      res.status(200).json({ otpVerified : true });

    }else{
      res.status(401).json({ otpVerified : false });
    }
  } catch(err) {
        res.status(500).json({ error: err });
  }
}

export async function createNewPassword(req, res) {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  try{
    let usr = await User.findOne({'email': email});

    usr.password = await bcrypt.hash(password, 10);
    usr.save((err) => {
      if (err) {
        res
          .status(400)
          .json({ message: "An error occurred", error: err.message });
        process.exit(1);
      }
    });
    res.status(200).json({ message: "password changed successfully"});
  } catch(err) {
    console.log(err)
        res.status(500).json({ message: err });
  }
}
///////////////////////////////////////////////VerifyAccount
export async function ResendWelcomeMail(req, res) {
  const email = req.body.email.toLowerCase();
  const id = req.body.id
  try{
    let currentUser = await User.findOne({'email': email});
    if(currentUser){
      sendWelcomeEmail(currentUser.email, currentUser._id);
      res.status(200).json({ message: "Please check your email"});
    }else{
      res.status(404).json({ message: "Invalid email adress"});
    }
  } catch(err) {
        res.status(500).json({ error: err });
  }
}

export async function saveImage(req, res) {
  console.log("changing image")
  const email = req.body.email.toLowerCase();
  try{
    let currentUser = await User.findOne({'email': email});
      try {
        currentUser.imageId = req.file.filename;
        currentUser.save()
        res.status(201).json({ message: "Image Uploaded", imageId: req.file.filename});
   } catch (error) {
       console.log(error)
       res.status(400).json({ message: error });
   }
    
  } catch(error) {
        res.status(500).json({ message: error });
  }
}

