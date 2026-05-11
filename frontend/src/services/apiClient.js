/**
 * API Client with Automatic Token Refresh
 * Handles all API requests with automatic token refresh on 401 errors
 * Implements production-ready request/response interceptors
 */

import authService from "./authService";

const API_URL = "https://personal-portfolio-backend-wgw1.onrender.com";

/**
 * Queue for requests waiting for token refresh
 */
let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const onTokenRefreshed = (newToken) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

/**
 * Make API request with automatic token refresh
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;

  // Get current token
  let token = authService.getAccessToken();

  // Prepare headers
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Add auth header if token exists
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Make request with credentials for cookie support
  const config = {
    ...options,
    headers,
    credentials: "include",
  };

  try {
    let response = await fetch(url, config);

    // Handle 401 Unauthorized - Token expired
    let errorData = null;
    if (response.status === 401 || response.status === 403) {
      errorData = await response.json().catch(() => ({}));

      // Check if token expired (specific error code from backend)
      if (errorData.code === "TOKEN_EXPIRED" || response.status === 401) {
        // If already refreshing, wait for it
        if (isRefreshing) {
          return new Promise((resolve) => {
            subscribeTokenRefresh((newToken) => {
              // Retry with new token
              headers.Authorization = `Bearer ${newToken}`;
              resolve(fetch(url, { ...config, headers }));
            });
          });
        }

        // Start token refresh
        isRefreshing = true;

        try {
          const newToken = await authService.refreshToken();
          isRefreshing = false;
          onTokenRefreshed(newToken);

          // Retry original request with new token
          headers.Authorization = `Bearer ${newToken}`;
          response = await fetch(url, { ...config, headers });
        } catch (refreshError) {
          isRefreshing = false;
          refreshSubscribers = [];

          // Refresh failed, logout and redirect
          authService.logout();
          window.location.href = "/login";
          throw new Error("Session expired. Please login again.");
        }
      }
    }

    // Handle other errors
    if (!response.ok) {
      // If we already parsed error data above, use it
      if (!errorData) {
        errorData = await response.json().catch(() => ({
          message: "Request failed",
        }));
      }
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    // Parse JSON response if present
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return response;
  } catch (error) {
    if (error.name === "TypeError" && error.message === "Failed to fetch") {
      throw new Error("Network error. Please check your connection.");
    }
    throw error;
  }
};

/**
 * HTTP methods
 */
const get = (endpoint) => apiRequest(endpoint, { method: "GET" });

const post = (endpoint, data) =>
  apiRequest(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });

const put = (endpoint, data) =>
  apiRequest(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });

const patch = (endpoint, data) =>
  apiRequest(endpoint, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

const del = (endpoint) => apiRequest(endpoint, { method: "DELETE" });

const apiClient = {
  get,
  post,
  put,
  patch,
  delete: del,
  request: apiRequest,
};

export default apiClient;
