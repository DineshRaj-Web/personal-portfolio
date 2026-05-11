import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const AuthContext = createContext(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  /**
   * Check authentication status on app load
   * Validates token and fetches user info
   */
  const checkAuth = useCallback(async () => {
    try {
      const token = authService.getAccessToken();

      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      // Check if token is expired
      if (authService.isTokenExpired(token)) {
        // Try to refresh
        try {
          await authService.refreshToken();
        } catch {
          // Refresh failed, clear auth state
          setIsAuthenticated(false);
          setUser(null);
          return;
        }
      }

      // Token is valid, get user info
      const data = await authService.getCurrentUser();
      setUser(data.admin);
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Setup automatic logout when token expires
   * Runs a periodic check every minute
   */
  useEffect(() => {
    // Check auth on mount and after login attempts
    checkAuth();

    // Check token expiration every minute
    const interval = setInterval(() => {
      const token = authService.getAccessToken();

      if (token && authService.isTokenExpired(token)) {
        // Token expired, logout user
        handleLogout();
      }
    }, 60000); // Check every minute

    return () => {
      clearInterval(interval);
    };
  }, [checkAuth]);

  /**
   * Handle user login
   */
  const handleLogin = async (identifier, password) => {
    setIsLoading(true);
    try {
      const data = await authService.login(identifier, password);
      setUser(data.admin);
      setIsAuthenticated(true);
      
      // Redirect is handled by the login component to avoid conflicts
      return { success: true, user: data.admin };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle user logout
   * Clears tokens and redirects to appropriate login page
   */
  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      // Check user role before logout to determine correct login page
      const currentUser = user;
      if (currentUser?.role === "SUPER_ADMIN") {
        navigate("/superadmin-login");
      } else {
        navigate("/login");
      }
    }
  }, [navigate, user]);

  /**
   * Auto-refresh token before it expires
   * Refreshes 2 minutes before expiration
   */
  useEffect(() => {
    if (!isAuthenticated) return;

    const checkAndRefreshToken = async () => {
      const token = authService.getAccessToken();
      if (!token) return;

      const timeUntilExpiry = authService.getTimeUntilExpiration(token);

      // If token expires in less than 2 minutes, refresh it
      if (timeUntilExpiry > 0 && timeUntilExpiry < 2 * 60 * 1000) {
        try {
          await authService.refreshToken();
        } catch {
          // Refresh failed, logout
          handleLogout();
        }
      }
    };

    // Check every minute
    const interval = setInterval(checkAndRefreshToken, 60000);
    return () => clearInterval(interval);
  }, [isAuthenticated, handleLogout]);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
