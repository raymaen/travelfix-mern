const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
  // The header value will be set in the front-end
  const token = req.header("x-auth-token");
  try {
    // Check for token
    if (!token) return res.status(401).json({ msg: "You are unauthurized" });

    const decodedToken = jwt.verify(token, config.get("jwtSecret"));
    // Add user from the payload
    req.user = decodedToken;
    return next();
  } catch (e) {
    return res.status(400).json({ msg: "Invalid user data" });
  }
}
  
module.exports = auth
