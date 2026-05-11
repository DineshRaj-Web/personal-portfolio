module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key-change-this-in-production",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key-change-this-in-production",
  PORT: process.env.PORT || 5000,
  // Token expiry times
  ACCESS_TOKEN_EXPIRY: "15m", // 15 minutes - short lived for security
  REFRESH_TOKEN_EXPIRY: "7d", // 7 days - long lived but revocable
  // Cookie settings
  COOKIE_SECURE: process.env.NODE_ENV === "production", // Secure in production
  COOKIE_SAME_SITE: process.env.NODE_ENV === "production" ? "none" : "lax",
};
