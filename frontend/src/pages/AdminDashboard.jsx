import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../components/admin/SearchBar";
import MessageTable from "../components/admin/MessageTable";
import { useAuthContext } from "../context/AuthContext";
import apiClient from "../services/apiClient";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, isLoading: authLoading } = useAuthContext();
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const handleLogout = async () => {
    await logout();
  };

  // Protect route - redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await apiClient.get("/messages");
      setMessages(data);
      setFilteredMessages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredMessages(messages);
      return;
    }

    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = messages.filter(
      (message) =>
        message.name.toLowerCase().includes(lowercasedTerm) ||
        message.email.toLowerCase().includes(lowercasedTerm) ||
        (message.projectType && message.projectType.toLowerCase().includes(lowercasedTerm))
    );
    
    setFilteredMessages(filtered);
  };

  const handleDelete = async (id) => {
    const updatedMessages = messages.filter((msg) => msg.id !== id);
    const updatedFiltered = filteredMessages.filter((msg) => msg.id !== id);
    
    setMessages(updatedMessages);
    setFilteredMessages(updatedFiltered);
    
    showToast("Message moved to trash", "success");
    
    try {
      await apiClient.put(`/messages/${id}/delete`);
    } catch {
      showToast("Failed to delete message", "error");
      fetchMessages();
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleRefresh = () => {
    fetchMessages();
    showToast("Data refreshed", "success");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {toast && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
              toast.type === "success"
                ? "bg-green-900/90 border border-green-700 text-green-100"
                : "bg-red-900/90 border border-red-700 text-red-100"
            }`}
          >
            <div className="flex items-center gap-2">
              {toast.type === "success" ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <span className="font-medium">{toast.message}</span>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm">
                Manage contact form messages • {filteredMessages.length} of {messages.length} messages
              </p>
            </div>
            <div className="flex items-center gap-3">
              {user?.role === "SUPER_ADMIN" && (
                <Link
                  to="/admin/admins"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-900 hover:bg-purple-800 text-white rounded-lg transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1m0 0l-6-6m6 6v6m6-6v6m6 6h9" />
                  </svg>
                  Admin Management
                </Link>
              )}
              <Link
                to="/admin/trash"
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Trash
              </Link>
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg 
                  className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white rounded-lg transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-gray-400">
              <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-lg">Loading messages...</span>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-6 text-center">
            <div className="text-red-400 mb-4">
              <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-red-200 text-lg font-medium mb-2">Error loading messages</h3>
            <p className="text-red-300/80 mb-4">{error}</p>
            <button
              onClick={fetchMessages}
              className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <MessageTable 
            messages={filteredMessages} 
            onDelete={handleDelete} 
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
