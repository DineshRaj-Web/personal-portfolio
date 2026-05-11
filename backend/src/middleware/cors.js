/**
 * CORS middleware configuration
 * Allows credentials (cookies) for refresh token support
 * Uses specific origin for security instead of wildcard
 */
const ALLOWED_ORIGINS = [
  "http://localhost:5173", // Vite dev server
  "http://localhost:3000", // React dev server
  "https://dinesh-raj.vercel.app", // Production frontend on Vercel
];

const cors = (req, res, next) => {
  const origin = req.headers.origin;

  // Check if origin is allowed
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  // Allow credentials (cookies)
  res.header("Access-Control-Allow-Credentials", "true");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
};

module.exports = cors;
