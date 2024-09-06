const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "supersecretkey";
const expiration = "2h";

module.exports = {
  signToken: function ({ _id, username, email }) {
    const payload = { _id, username, email };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  authenticateUser: function (req, res, next) {
    const token = req.headers.authorization;
    if (token) {
      try {
        const { data } = jwt.verify(token, secret);
        req.user = data;
      } catch {
        console.log("Invalid token");
      }
    }
    next();
  },
};
