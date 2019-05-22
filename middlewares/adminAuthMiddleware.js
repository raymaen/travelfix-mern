// Currently not in use

const jwt = require("jsonwebtoken");
const config = require("config");

function authAdmin(req, res, next) {
  const token = req.header("x-auth-token");

  try {
    // Check for token
    if (!token) return res.status(401).json({ msg: "You are unauthurized" });

    const decodedToken = jwt.verify(token, config.get("jwtSecret"));
    // Is the userID matching the admin ID?
    if (decodedToken.id === config.get("adminID")) return next();
    return res.status(401).json({ msg: "You are unauthurized" });
  } catch (e) {
    return res.status(400).json({ msg: "Invalid user data" });
  }
}

module.exports = authAdmin  ;
