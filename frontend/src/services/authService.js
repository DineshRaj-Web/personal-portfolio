/**
 * Authentication Service
 * Handles all authentication operations including login, logout, and token refresh
 * Implements secure token handling with automatic refresh
 */

import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:5000";

/**
 * Store access token in localStorage
 * Note: Only access token is stored here, refresh token is in HTTP-only cookie
 */
const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};

/**
 * Get access token from localStorage
 */
const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

/**
 * Remove access token from localStorage
 */
const removeAccessToken = () => {
  localStorage.removeItem("accessToken");
};

/**
 * Decode JWT token and check if expired
 */
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
};

/**
 * Get token expiration time in milliseconds
 */
const getTokenExpirationTime = (token) => {
  if (!token) return 0;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000; // Convert to milliseconds
  } catch {
    return 0;
  }
};

/**
 * Get time until token expires in milliseconds
 */
const getTimeUntilExpiration = (token) => {
  const expirationTime = getTokenExpirationTime(token);
  return expirationTime - Date.now();
};

/**
 * Super Admin login (username + password)
 * Stores access token in localStorage
 */
const superAdminLogin = async (username, password) => {
  const response = await fetch(`${API_URL}/auth/superadmin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  // Store access token in localStorage
  setAccessToken(data.token);

  return data;
};

/**
 * Admin login (email + password)
 * Stores access token in localStorage
 */
const adminLogin = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  // Store access token in localStorage
  setAccessToken(data.token);

  return data;
};

/**
 * Login user (legacy - uses admin login)
 * Stores access token in localStorage, refresh token in HTTP-only cookie
 */
const login = async (identifier, password) => {
  // Try email login first (most common)
  try {
    return await adminLogin(identifier, password);
  } catch {
    // If email login fails, try username (for backward compatibility)
    return await superAdminLogin(identifier, password);
  }
};

/**
 * Logout user
 * Clears both access token and refresh token
 */
const logout = async () => {
  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include", // Important: sends cookies
    });
  } catch {
    // Ignore errors, always clear local token
  } finally {
    removeAccessToken();
  }
};

/**
 * Refresh access token using refresh token from cookie
 * Called automatically when access token is expired
 */
const refreshToken = async () => {
  const response = await fetch(`${API_URL}/refresh`, {
    method: "POST",
    credentials: "include", // Important: sends refresh token cookie
  });

  const data = await response.json();

  if (!response.ok) {
    // If refresh fails, clear tokens and throw error
    removeAccessToken();
    throw new Error(data.message || "Session expired");
  }

  // Store new access token
  setAccessToken(data.accessToken);

  return data.accessToken;
};

/**
 * Get current authenticated admin info
 */
const getCurrentUser = async () => {
  const token = getAccessToken();

  if (!token) {
    throw new Error("No token available");
  }

  const response = await fetch(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to get user info");
  }

  return response.json();
};

/**
 * Check if user is authenticated
 * Returns true if access token exists and is not expired
 */
const isAuthenticated = () => {
  const token = getAccessToken();
  return token && !isTokenExpired(token);
};

/**
 * Get authorization header for API requests
 * Automatically refreshes token if needed
 */
const getAuthHeader = async () => {
  let token = getAccessToken();

  // If token is expired, try to refresh it
  if (!token || isTokenExpired(token)) {
    try {
      token = await refreshToken();
    } catch {
      // Refresh failed, user needs to login again
      return null;
    }
  }

  return token ? { Authorization: `Bearer ${token}` } : null;
};

const authService = {
  superAdminLogin,
  adminLogin,
  login,
  logout,
  refreshToken,
  getCurrentUser,
  isAuthenticated,
  isTokenExpired,
  getTokenExpirationTime,
  getTimeUntilExpiration,
  getAccessToken,
  getAuthHeader,
};

export default authService;
