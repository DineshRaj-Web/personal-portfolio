import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const TrashPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  useEffect(() => {
    fetchTrashMessages();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("accessToken");
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
  };

  const fetchTrashMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch("http://localhost:5000/messages/trash", {
        headers: getAuthHeaders()
      });
      
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          handleLogout();
        }
        throw new Error("Failed to fetch trash messages");
      }
      
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching trash messages:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (id) => {
    const updatedMessages = messages.filter((msg) => msg.id !== id);
    setMessages(updatedMessages);
    showToast("Message restored successfully", "success");
    
    try {
      const response = await fetch(`http://localhost:5000/messages/${id}/restore`, { 
        method: 'PUT',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          handleLogout();
        }
        throw new Error("Failed to restore message");
      }
    } catch (err) {
      console.error("Error restoring message:", err);
      showToast("Failed to restore message", "error");
      fetchTrashMessages();
    }
  };

  const handlePermanentDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this message? This action cannot be undone.")) {
      return;
    }

    const updatedMessages = messages.filter((msg) => msg.id !== id);
    setMessages(updatedMessages);
    showToast("Message permanently deleted", "success");
    
    try {
      const response = await fetch(`http://localhost:5000/messages/${id}/permanent`, { 
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          handleLogout();
        }
        throw new Error("Failed to permanently delete message");
      }
    } catch (err) {
      console.error("Error permanently deleting message:", err);
      showToast("Failed to permanently delete message", "error");
      fetchTrashMessages();
    }
  };

  const handleEmptyTrash = async () => {
    if (!window.confirm("Are you sure you want to permanently delete ALL messages in trash? This action cannot be undone.")) {
      return;
    }

    setMessages([]);
    showToast("Trash emptied", "success");
    
    try {
      const response = await fetch("http://localhost:5000/messages/trash/empty", { 
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          handleLogout();
        }
        throw new Error("Failed to empty trash");
      }
    } catch (err) {
      console.error("Error emptying trash:", err);
      showToast("Failed to empty trash", "error");
      fetchTrashMessages();
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDaysUntilAutoDelete = (deletedAt) => {
    const deletedDate = new Date(deletedAt);
    const now = new Date();
    const diffTime = now - deletedDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const daysLeft = 30 - diffDays;
    
    if (daysLeft <= 0) {
      return { text: "Auto-deleting soon", color: "text-red-400 border-red-800 bg-red-900/20", urgent: true };
    }
    if (daysLeft <= 7) {
      return { text: `${daysLeft} days left`, color: "text-orange-400 border-orange-800 bg-orange-900/20", urgent: true };
    }
    return { text: `${daysLeft} days left`, color: "text-gray-400 border-gray-700 bg-gray-800/50", urgent: false };
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 font-sans selection:bg-cyan-900/30">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div
            className={`px-4 py-3 rounded-lg shadow-2xl border backdrop-blur-md flex items-center gap-3 ${
              toast.type === "success"
                ? "bg-green-950/80 border-green-800/50 text-green-200"
                : "bg-red-950/80 border-red-800/50 text-red-200"
            }`}
          >
            {toast.type === "success" ? (
              <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className="font-medium text-sm">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="bg-[#111111] border-b border-white/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-red-500/10 rounded-xl border border-red-500/20">
                <svg className="h-6 w-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">Trash</h1>
                <p className="text-gray-400 text-xs mt-0.5 flex items-center gap-1.5">
                  <span>{messages.length} item{messages.length !== 1 ? 's' : ''}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                  <span>Auto-deletes after 30 days</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2.5">
              <Link
                to="/admin"
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 transition-colors text-sm font-medium"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Dashboard
              </Link>
              {messages.length > 0 && (
                <button
                  onClick={handleEmptyTrash}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition-colors text-sm font-medium"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Empty Trash
                </button>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-lg border border-white/10 transition-colors text-sm font-medium ml-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <svg className="animate-spin h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-sm text-gray-400 font-medium tracking-wide">Loading trash...</span>
          </div>
        )}

        {error && !loading && (
          <div className="max-w-lg mx-auto bg-red-500/5 border border-red-500/20 rounded-2xl p-8 text-center mt-12">
            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-6 w-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Failed to load</h3>
            <p className="text-gray-400 text-sm mb-6">{error}</p>
            <button
              onClick={fetchTrashMessages}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center max-w-md mx-auto">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <svg className="h-10 w-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Trash is empty</h3>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Deleted messages will appear here and will be permanently removed after 30 days.
            </p>
            <Link
              to="/admin"
              className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors text-sm font-medium shadow-[0_0_15px_rgba(8,145,178,0.3)]"
            >
              Back to Dashboard
            </Link>
          </div>
        )}

        {!loading && !error && messages.length > 0 && (
          <div className="bg-[#111111] border border-white/5 rounded-xl shadow-xl overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block w-full overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="border-b border-white/5 bg-[#161616]">
                    <th className="py-4 px-5 text-xs font-semibold text-gray-400 uppercase tracking-wider w-[20%]">Sender</th>
                    <th className="py-4 px-5 text-xs font-semibold text-gray-400 uppercase tracking-wider w-[15%]">Type</th>
                    <th className="py-4 px-5 text-xs font-semibold text-gray-400 uppercase tracking-wider w-[35%]">Message</th>
                    <th className="py-4 px-5 text-xs font-semibold text-gray-400 uppercase tracking-wider w-[15%]">Status</th>
                    <th className="py-4 px-5 text-xs font-semibold text-gray-400 uppercase tracking-wider w-[15%] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {messages.map((message) => {
                    const autoDeleteInfo = getDaysUntilAutoDelete(message.deletedAt);
                    return (
                      <tr
                        key={message.id}
                        className={`hover:bg-white/2 transition-colors group ${autoDeleteInfo.urgent ? 'bg-red-500/2' : ''}`}
                      >
                        <td className="py-4 px-5 align-top">
                          <div className="text-sm font-medium text-white mb-0.5 truncate max-w-[200px]">{message.name}</div>
                          <a href={`mailto:${message.email}`} className="text-xs text-gray-500 hover:text-cyan-400 transition-colors block truncate max-w-[200px]">
                            {message.email}
                          </a>
                        </td>
                        <td className="py-4 px-5 align-top">
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-medium bg-white/5 text-gray-300 border border-white/10">
                            {message.projectType || "General"}
                          </span>
                        </td>
                        <td className="py-4 px-5 align-top">
                          <p className="text-sm text-gray-400 truncate max-w-sm" title={message.message}>
                            {message.message}
                          </p>
                          <div className="text-[11px] text-gray-600 mt-1">
                            Deleted on {formatDate(message.deletedAt)}
                          </div>
                        </td>
                        <td className="py-4 px-5 align-top">
                          <span className={`inline-flex items-center px-2 py-1 rounded-md text-[11px] font-medium border ${autoDeleteInfo.color}`}>
                            {autoDeleteInfo.text}
                          </span>
                        </td>
                        <td className="py-4 px-5 align-top text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleRestore(message.id)}
                              className="p-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-md transition-colors tooltip-trigger"
                              title="Restore"
                            >
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handlePermanentDelete(message.id)}
                              className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-md transition-colors"
                              title="Delete Permanently"
                            >
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet List */}
            <div className="lg:hidden divide-y divide-white/5">
              {messages.map((message) => {
                const autoDeleteInfo = getDaysUntilAutoDelete(message.deletedAt);
                return (
                  <div
                    key={message.id}
                    className={`p-5 hover:bg-white/2 transition-colors ${autoDeleteInfo.urgent ? 'bg-red-500/2' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-3 gap-4">
                      <div className="min-w-0">
                        <h3 className="text-sm font-medium text-white truncate">{message.name}</h3>
                        <a href={`mailto:${message.email}`} className="text-xs text-gray-500 hover:text-cyan-400 truncate block mt-0.5">
                          {message.email}
                        </a>
                      </div>
                      <span className={`shrink-0 inline-flex items-center px-2 py-1 rounded-md text-[10px] font-medium border ${autoDeleteInfo.color}`}>
                        {autoDeleteInfo.text}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 text-gray-300 border border-white/10">
                          {message.projectType || "General"}
                        </span>
                        <span className="text-[10px] text-gray-600">
                          {formatDate(message.deletedAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                        {message.message}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                      <button
                        onClick={() => handleRestore(message.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-xs font-medium"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Restore
                      </button>
                      <button
                        onClick={() => handlePermanentDelete(message.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors text-xs font-medium"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrashPage;
