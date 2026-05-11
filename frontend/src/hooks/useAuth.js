import { useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import authService from "../services/authService";

/**
 * useAuth Hook
 * Provides authentication state and auto-logout functionality
 * Monitors token expiration and handles automatic redirects
 */
const useAuth = () => {
  const { user, isAuthenticated, isLoading, logout, checkAuth } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Check token expiration and redirect if needed
   * Runs on route changes
   */
  useEffect(() => {
    // Only check auth on mount and route changes, not continuously
    const checkToken = async () => {
      // Skip check for public routes
      const publicRoutes = ["/login", "/contact"];
      if (publicRoutes.includes(location.pathname)) {
        return;
      }
      const token = authService.getAccessToken();

      // No token, redirect to login
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      // Token expired, try to refresh
      if (authService.isTokenExpired(token)) {
        try {
          await authService.refreshToken();
        } catch {
          // Refresh failed, logout and redirect
          logout();
        }
      }
    };
    
    // Check auth on mount and when location changes
    checkToken();
  }, [location.pathname, navigate, logout, checkAuth]);

  /**
   * Manual check for token expiration
   * Can be called before API calls
   */
  const requireAuth = useCallback(async () => {
    const token = authService.getAccessToken();

    if (!token) {
      navigate("/login");
      throw new Error("Not authenticated");
    }

    if (authService.isTokenExpired(token)) {
      try {
        await authService.refreshToken();
        return authService.getAccessToken();
      } catch {
        logout();
        throw new Error("Session expired");
      }
    }

    return token;
  }, [navigate, logout]);

  /**
   * Get valid token for API calls
   * Automatically refreshes if needed
   */
  const getValidToken = useCallback(async () => {
    let token = authService.getAccessToken();

    if (!token || authService.isTokenExpired(token)) {
      try {
        token = await authService.refreshToken();
      } catch {
        logout();
        throw new Error("Session expired");
      }
    }

    return token;
  }, [logout]);

  return {
    user,
    isAuthenticated,
    isLoading,
    logout,
    requireAuth,
    getValidToken,
  };
};

export default useAuth;
