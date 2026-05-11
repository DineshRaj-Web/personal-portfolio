const jwt = require("jsonwebtoken");
const config = require("../config");

/**
 * Authentication middleware
 * Verifies JWT access token from Authorization header
 * Returns 401 if no token, 403 if token is invalid or expired
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        message: "Forbidden: Token expired",
        code: "TOKEN_EXPIRED",
      });
    }
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

module.exports = authMiddleware;
