import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { sendWelcomeEmail, sendOtpEmail } from "../middlewares/nodemailMiddleware.js";
import generateOTP from "../middlewares/otpMiddleware.js";

export async function signup(req, res) {

  try {
    const { firstname, lastname, password } = req.body;
    const email = req.body.email.toLowerCase()
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).json({ message: "Email Already Exists" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const otpCode = generateOTP();
    const currentUser = await User.create({
      firstname: firstname.toLowerCase(),
      lastname: lastname.toLowerCase(),
      email: email.toLowerCase(),
      password: encryptedPassword,
      otpCode: otpCode,
      imageId: "defaultImage.png"
    }).catch((err) => {
      return res.status(400).json({ message: err.message });
    });
    const newToken = jwt.sign(
      { user_id: currentUser._id, email: currentUser.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "4h",
      }
    );
    if(password != ""){
      sendWelcomeEmail(currentUser.email, currentUser._id);

    }
    return res.status(200).json({ message: "account created", token: newToken, currentUser });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }

}

export async function verifyAccount(req, res) {
  const id = req.params.id;
  try {
    let currentUser = await User.findById(id);
    if (!currentUser.isVerified) {
      currentUser.isVerified = true;
      currentUser.save((err) => {
        if (err) {
          res
            .status(400)
            .json({ message: "An error occurred", error: err.message });
          process.exit(1);
        }
        res.status(200).json({ message: "Your account has been verified successfully" });
      });
    } else {
      res.status(404).json({ message: "link expired" });
    }


  } catch (err) {
    res.status(500).json({ error: err });
  }
}



export async function signin(req, res) {
  try{
    const email = req.body.email.toLowerCase()
    const  password = req.body.password;

    const currentUser = await User.findOne({ 'email': email });
    if (currentUser && (await bcrypt.compare(password, currentUser.password))) {
      
      const payload = {id:currentUser.id};
      const token = jwt.sign(payload,process.env.SECRET_KEY, {
          expiresIn: 60 * 60 * 24,
      });

      return res.status(200).json({message : "login avec succeés", token: token, userId: currentUser._id});
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
  const { id, firstname, lastname, password } = req.body;
  try {
    let currentUser = await User.findById(id);

    currentUser.firstname = firstname;
    currentUser.lastname = lastname;
    if (password.length !== 0) {
      const encryptedPassword = await bcrypt.hash(password, 10);
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

  } catch (err) {
    res.status(500).json({ message: err });
  }
}

export async function remove(req, res) {
  try {
    const usr = await User
      .findByIdAndDelete(req.params.id);

    if (!usr) {
      res.status(404).json({ "message": "No such user found" })
    }
    res.status(200).json({ "Deleted user": usr })
  }
  catch (err) {
    res.status(500).json({ "message": err })
    console.log(err);
  }
}

////////////////////////////////////////////////forgot password Scenario////////////////////////////////

export async function sendCode(req, res) {
  const email = req.body.email.toLowerCase();
  try {
    let currentUser = await User.findOne({ 'email': email });
    if (currentUser) {
      currentUser.otpCode=generateOTP()
      sendOtpEmail(currentUser.email, currentUser.otpCode);
      currentUser.save()
      
      res.status(200).json({ message: "Please check your email" });
     
    } else {
      res.status(404).json({ message: "Invalid email adress" });
    }

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err });
  }
}

export async function verifyOTP(req, res) {
  const email = req.body && req.body.email ? req.body.email.toLowerCase() : null;
  const otp = req.body.otpCode;
 
  try {
    let usr = await User.findOne({ 'email': email },);
    console.log(`${otp} ==== ${usr.otpCode}`)
    if (usr && usr.otpCode == otp) {
        const payload = {id:usr.id};
        const token = jwt.sign(payload,process.env.SECRET_KEY, {
            expiresIn: 60 * 60 * 24,
        });
  
      res.status(200).json({ otpVerified: true ,token:token});
      
    } else {
      res.status(401).json({ otpVerified: false });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export async function createNewPassword(req, res) {

  try {
    let usr = await User.findById(req.user._id);
    usr.password = await bcrypt.hash(req.body.password, 10);
    usr.save((err) => {
      if (err) {
        res
          .status(400)
          .json({ message: "An error occurred", error: err.message });
        process.exit(1);
      }
    });
    res.status(200).json({ message: "password changed successfully" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err });
  }
}
///////////////////////////////////////////////VerifyAccount
export async function ResendWelcomeMail(req, res) {
  const email = req.body.email.toLowerCase();
  const id = req.body.id
  try {
    let currentUser = await User.findOne({ 'email': email });
    if (currentUser) {
      sendWelcomeEmail(currentUser.email, currentUser._id);
      res.status(200).json({ message: "Please check your email" });
    } else {
      res.status(404).json({ message: "Invalid email adress" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export async function saveImage(req, res) {
  console.log("changing image")
  try {
    var currentUser = req.user
    currentUser.imageId = req.file.filename;
    currentUser.save()
    res.status(201).json(req.file.filename );
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function searchByName(req, res) {
  try {
    const { searchText } = req.body;
    var users;
    users = await User.find({
      $or: [{ firstname: new RegExp('.*' + searchText.toLowerCase() + '.*') },
      { lastname: new RegExp('.*' + searchText.toLowerCase() + '.*') }]
    });

    return res.status(200).json({ users });
  }
  catch (err) {
    console.log(err.message);
    return res.status(500).json(err.message);
  }
}

export async function getuser(req, res) {
  User.findById(req.params.id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}



export async function profile (req,res) {
  if(!req.user){
      return res.status('401').json({error: "You're not authenticated!"});
  }
  const user = await User.findById(req.user._id);
//ERROR HANDLE IF USER NOT FOUND
  res.status(200).json(user);
}



export async function getById(req, res) {
  try {
    const { userId } = req.body;
    var user = await User.findById(userId);
    if (user) {
      return res.status(200).json({ user });
    } else {
      return res.status(404).json({ message: "user not found" });
    }
  }
  catch (err) {
    console.log(err.message);
    return res.status(500).json(err.message);
  }
}

export async function loginByEmail(req, res) {
  try {
    const email = req.body.email.toLowerCase()

    const currentUser = await User.findOne({ 'email': email });

    if (currentUser) {

      const newToken = jwt.sign(
        { user_id: currentUser._id, email: currentUser.email },
        process.env.SECRET_KEY,
        {
          expiresIn: "4h",
        }
      );

      return res.status(200).json({ message: "login google avec succeés", token: newToken, currentUser });
    }
    else {
      res.status(400).json({ message: "No such user exists, please signUp" });
    }

  } catch (err) {
    console.log(err);
  }
}

export async function getTerms(req, res) {
  try {
    return res.status(200).json("terms");
  } catch (err) {
    console.log(err);
  }
}