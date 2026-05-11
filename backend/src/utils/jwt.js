const jwt = require("jsonwebtoken");
const config = require("../config");

/**
 * Generate JWT token
 * @param {Object} payload - User data to include in token
 * @param {String} expiresIn - Token expiry time (default: 15 minutes)
 * @returns {String} JWT token
 */
const generateToken = (payload, expiresIn = "15m") => {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn });
};

/**
 * Verify JWT token
 * @param {String} token - JWT token to verify
 * @returns {Object} Decoded token payload
 */
const verifyToken = (token) => {
  return jwt.verify(token, config.JWT_SECRET);
};

/**
 * Generate random reset token
 * @returns {String} Random 32-character hex string
 */
const generateResetToken = () => {
  return require("crypto").randomBytes(32).toString("hex");
};

/**
 * Calculate reset token expiry (15 minutes from now)
 * @returns {Date} Expiry date
 */
const getResetTokenExpiry = () => {
  return new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
};

/**
 * Check if reset token is expired
 * @param {Date} expiryDate - Token expiry date
 * @returns {Boolean} True if expired
 */
const isResetTokenExpired = (expiryDate) => {
  return new Date() > new Date(expiryDate);
};

module.exports = {
  generateToken,
  verifyToken,
  generateResetToken,
  getResetTokenExpiry,
  isResetTokenExpired
};
