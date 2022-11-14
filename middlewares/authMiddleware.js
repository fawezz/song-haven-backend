import jwt from "jsonwebtoken";

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



export default verifyToken;