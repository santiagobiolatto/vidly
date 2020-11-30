const jwt = require("jsonwebtoken");
const config = require('../config/config');

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(401).send("Access denied: No token provided");
    return;
  }
  try {
    //This brings the decoded payload of the token
    const decoded = jwt.verify(token, config.JWTSecret);
    req.user = decoded;
    next();
  } catch (ex) {
      res.status(400).send('Invalid token');
  }
}

module.exports = auth;
