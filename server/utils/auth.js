const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "mysecretsshh";
const expiration = "2h";

module.exports = {
  signToken: function ({ _id, username, email }) {
    const payload = { _id, username, email };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  authMiddleware: function ({ req }) {
    // Extract token from request headers
    let token = req.headers.authorization || "";

    // // Remove 'Bearer' if it's part of the token
    // if (token.startsWith("Bearer ")) {
    //   token = token.slice(7).trim();
    // }

    if (token) {
      // Remove "Bearer" from the token string
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      console.log("No token found");
      return req;
    }

    try {
      // Verify token and attach user to request
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
      console.log("User data:", req.user);
    } catch (err) {
      console.log("Invalid token:", err.message);
    }

    return req;
  },
};
