import jwt from "jsonwebtoken";
import User from "../models/user.js";
const config = process.env;

const verifyToken = (req, res, next) => {
  const Token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!Token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify( Token , config.SECRET_KEY);
    
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export async function protect (req,res,next) {
  if(!req.headers.authorization){
      return res.status(302).json({success : false , message: "no auth"});
  }

  const token = req.headers.authorization.replace("Bearer","").trim();

  try {
      const decoded = jwt.verify(token,process.env.SECRET_KEY);
      console.log(decoded)
       const user = await User.findById(decoded.id);
       req.user = user;
       next();
  } catch (err) {
      res.status(302).json({success: false, message: err});
  }
}

export default verifyToken;