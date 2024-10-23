import jwt from "jsonwebtoken";

const tokenValidator = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    if (!verified) {
      return res.status(401).json({ msg: "Token is not valid" });
    }
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default tokenValidator;
