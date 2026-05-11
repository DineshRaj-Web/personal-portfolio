import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import apiClient from "../services/apiClient";
import "../styles/charts.css";

const SuperAdminDashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    totalAdmins: 0,
    totalMessages: 0,
    recentMessages: 0,
    systemHealth: 'good'
  });
  const [chartData, setChartData] = useState({
    messageTrend: [45, 52, 38, 65, 42, 78, 62, 89, 73, 95, 84, 91],
    adminActivity: [12, 19, 8, 15, 25, 18, 22, 31, 28, 35, 29, 42],
    projectTypes: { 'Web App': 45, 'Mobile App': 25, 'API': 15, 'Other': 15 },
    systemUsage: { cpu: 45, memory: 62, disk: 38, network: 71 }
  });
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [adminProfile, setAdminProfile] = useState(null);
  const [adminSubTab, setAdminSubTab] = useState('admins'); // 'admins' or 'superadmins'
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [editForm, setEditForm] = useState({ email: '', role: 'ADMIN', name: '' });
  
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user?.role !== "SUPER_ADMIN") {
      navigate("/admin");
      return;
    }
    fetchAdmins();
    fetchMessages();
    fetchAdminProfile();
    updateStats();
  }, [user, navigate]);

  const updateStats = () => {
    setStats(prev => ({
      ...prev,
      totalAdmins: admins.length,
      totalMessages: messages.length,
      recentMessages: messages.filter(msg => {
        const msgDate = new Date(msg.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return msgDate > weekAgo;
      }).length
    }));
  };

  const fetchAdminProfile = async () => {
    try {
      const data = await apiClient.get('/auth/me');
      setAdminProfile(data.admin);
    } catch (err) {
      console.error('Failed to fetch admin profile:', err);
    }
  };

  const { logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await apiClient.post('/auth/logout');
      logout();
      showToast('Logged out successfully', 'success');
    } catch (err) {
      showToast(err.message || 'Logout failed', 'error');
    }
  };

  const handleProfileClick = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-dropdown')) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    updateStats();
  }, [admins, messages]);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.get("/admin/admins");
      setAdmins(data.admins || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiClient.get("/messages");
      setMessages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    try {
      await apiClient.delete(`/admin/admins/${adminId}`);
      setAdmins(admins.filter((admin) => admin.id !== adminId));
      showToast("Admin deleted successfully", "success");
    } catch (err) {
      showToast(err.message || "Failed to delete admin", "error");
    }
  };

  const handleEditAdmin = (admin) => {
    setEditingAdmin(admin);
    setEditForm({
      email: admin.email,
      role: admin.role,
      name: admin.name || ''
    });
    setEditModalOpen(true);
  };

  const handleUpdateAdmin = async () => {
    try {
      const response = await apiClient.put(`/admin/admins/${editingAdmin.id}`, editForm);
      
      // Update admin in the list
      setAdmins(admins.map(admin => 
        admin.id === editingAdmin.id 
          ? { ...admin, ...response.admin }
          : admin
      ));
      
      setEditModalOpen(false);
      setEditingAdmin(null);
      showToast("Admin updated successfully", "success");
    } catch (err) {
      showToast(err.message || "Failed to update admin", "error");
    }
  };

  const handleEditFormChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleDeleteMessage = async (id) => {
    try {
      await apiClient.put(`/messages/${id}/delete`);
      setMessages(messages.filter(msg => msg.id !== id));
      showToast("Message moved to trash", "success");
    } catch {
      showToast("Failed to delete message", "error");
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 border-r border-gray-800 transition-all duration-300 flex flex-col`}>
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className={`font-bold text-xl text-white ${!sidebarOpen && 'hidden'}`}>Control Panel</h2>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'messages', label: 'Messages', icon: '💬' },
              { id: 'admins', label: 'Admins', icon: '👥' },
              { id: 'activity', label: 'Activity', icon: '📈' },
              { id: 'system', label: 'System', icon: '⚙️' },
              { id: 'logs', label: 'Logs', icon: '📋' },
              { id: 'settings', label: 'Settings', icon: '🔧' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? 'bg-purple-900 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <div className="profile-dropdown relative">
            <button
              onClick={handleProfileClick}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {adminProfile?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'S'}
                </span>
              </div>
              {sidebarOpen && (
                <div className="flex-1 text-left">
                  <p className="text-sm text-white font-medium">
                    {adminProfile?.name || 'Super Admin'}
                  </p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
              )}
              <svg 
                className={`w-4 h-4 text-gray-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 min-w-[200px]">
                <div className="p-2">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      setActiveTab('settings');
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-left"
                  >
                    <span className="text-lg">👤</span>
                    <div>
                      <p className="text-sm text-white font-medium">Profile</p>
                      <p className="text-xs text-gray-400">View your profile</p>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      setActiveTab('system');
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-left"
                  >
                    <span className="text-lg">⚙️</span>
                    <div>
                      <p className="text-sm text-white font-medium">Control Panel</p>
                      <p className="text-xs text-gray-400">System settings</p>
                    </div>
                  </button>
                  
                  <div className="border-t border-gray-700 my-2"></div>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-900/50 transition-colors text-left"
                  >
                    <span className="text-lg">🚪</span>
                    <div>
                      <p className="text-sm text-red-400 font-medium">Logout</p>
                      <p className="text-xs text-gray-400">Sign out of account</p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
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

        {/* Header */}
        <div className="bg-gray-900 border-b border-gray-800">
          <div className="px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">Super Admin Dashboard</h1>
                <p className="text-gray-400 text-sm">
                  System administration • {stats.totalAdmins} admins • {stats.totalMessages} messages
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button
                  onClick={fetchMessages}
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
                <Link
                  to="/admin/admins"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-900 hover:bg-purple-800 text-white rounded-lg transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1m0 0l-6-6m6 6v6m6-6v6m6 6h9" />
                  </svg>
                  Admin Management
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-auto">

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Message Trend Chart */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Message Trend (Last 12 Months)</h3>
                <div className="relative h-64">
                  <svg className="w-full h-full" viewBox="0 0 400 200">
                    {/* Grid Lines */}
                    {[0, 1, 2, 3, 4].map(i => (
                      <line
                        key={`grid-${i}`}
                        x1="40"
                        y1={40 + i * 40}
                        x2="360"
                        y2={40 + i * 40}
                        stroke="#374151"
                        strokeWidth="1"
                      />
                    ))}
                    
                    {/* Chart Line */}
                    <polyline
                      points={chartData.messageTrend.map((value, index) => {
                        const x = 40 + (index * 320 / (chartData.messageTrend.length - 1));
                        const y = 180 - (value / 100) * 140;
                        return `${x},${y}`;
                      }).join(' ')}
                      fill="none"
                      stroke="#8b5cf6"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-draw-line"
                    />
                    
                    {/* Chart Points */}
                    {chartData.messageTrend.map((value, index) => {
                      const x = 40 + (index * 320 / (chartData.messageTrend.length - 1));
                      const y = 180 - (value / 100) * 140;
                      return (
                        <circle
                          key={`point-${index}`}
                          cx={x}
                          cy={y}
                          r="4"
                          fill="#8b5cf6"
                          className="animate-pulse-point"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        />
                      );
                    })}
                    
                    {/* Labels */}
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                      <text
                        key={month}
                        x={40 + (index * 320 / 11)}
                        y="195"
                        fill="#9ca3af"
                        fontSize="12"
                        textAnchor="middle"
                      >
                        {month}
                      </text>
                    ))}
                  </svg>
                </div>
              </div>
              
              {/* Admin Activity Bar Chart */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Admin Activity</h3>
                <div className="relative h-64">
                  <svg className="w-full h-full" viewBox="0 0 400 200">
                    {/* Grid Lines */}
                    {[0, 1, 2, 3, 4].map(i => (
                      <line
                        key={`grid-${i}`}
                        x1="40"
                        y1={40 + i * 40}
                        x2="360"
                        y2={40 + i * 40}
                        stroke="#374151"
                        strokeWidth="1"
                      />
                    ))}
                    
                    {/* Bars */}
                    {chartData.adminActivity.map((value, index) => {
                      const height = (value / 50) * 140;
                      const x = 50 + (index * 280 / chartData.adminActivity.length);
                      return (
                        <rect
                          key={`bar-${index}`}
                          x={x}
                          y={180 - height}
                          width="20"
                          height={height}
                          fill="#3b82f6"
                          className="animate-grow-bar"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        />
                      );
                    })}
                    
                    {/* Labels */}
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                      <text
                        key={month}
                        x={60 + (index * 280 / 11)}
                        y="195"
                        fill="#9ca3af"
                        fontSize="12"
                        textAnchor="middle"
                      >
                        {month}
                      </text>
                    ))}
                  </svg>
                </div>
              </div>
            </div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Admins</p>
                    <p className="text-3xl font-bold text-white mt-2">{stats.totalAdmins}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">👥</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Messages</p>
                    <p className="text-3xl font-bold text-white mt-2">{stats.totalMessages}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💬</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Recent Messages</p>
                    <p className="text-3xl font-bold text-white mt-2">{stats.recentMessages}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📈</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">System Health</p>
                    <p className="text-3xl font-bold text-green-400 mt-2">Good</p>
                  </div>
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Distribution Pie Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Project Distribution</h3>
                <div className="relative h-64">
                  <svg className="w-full h-full" viewBox="0 0 200 200">
                    {/* Pie Chart */}
                    {Object.entries(chartData.projectTypes).reduce((acc, [project, percentage], index) => {
                      const startAngle = acc.currentAngle;
                      const endAngle = startAngle + (percentage / 100) * 360;
                      const largeArcFlag = percentage > 50 ? 1 : 0;
                      
                      const x1 = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
                      const y1 = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
                      const x2 = 100 + 80 * Math.cos((endAngle * Math.PI) / 180);
                      const y2 = 100 + 80 * Math.sin((endAngle * Math.PI) / 180);
                      
                      const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'];
                      
                      acc.elements.push(
                        <path
                          key={project}
                          d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                          fill={colors[index % colors.length]}
                          className="animate-grow-pie"
                          style={{ animationDelay: `${index * 0.2}s` }}
                        />
                      );
                      
                      acc.currentAngle = endAngle;
                      return acc;
                    }, { currentAngle: -90, elements: [] }).elements}
                    
                    {/* Center Circle */}
                    <circle cx="100" cy="100" r="40" fill="#111827" />
                    
                    {/* Center Text */}
                    <text x="100" y="100" fill="white" fontSize="14" textAnchor="middle" dominantBaseline="middle">
                      Projects
                    </text>
                  </svg>
                </div>
                
                {/* Legend */}
                <div className="mt-4 space-y-2">
                  {Object.entries(chartData.projectTypes).map(([project, percentage], index) => {
                    const colors = ['bg-purple-600', 'bg-blue-600', 'bg-green-600', 'bg-yellow-600'];
                    return (
                      <div key={project} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`} />
                          <span className="text-gray-300 text-sm">{project}</span>
                        </div>
                        <span className="text-gray-400 text-sm">{percentage}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* System Usage Donut Chart */}
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">System Usage</h3>
                <div className="relative h-64">
                  <svg className="w-full h-full" viewBox="0 0 200 200">
                    {/* Donut Chart */}
                    {Object.entries(chartData.systemUsage).reduce((acc, [resource, percentage], index) => {
                      const startAngle = acc.currentAngle;
                      const endAngle = startAngle + (percentage / 100) * 360;
                      const largeArcFlag = percentage > 50 ? 1 : 0;
                      
                      const x1 = 100 + 70 * Math.cos((startAngle * Math.PI) / 180);
                      const y1 = 100 + 70 * Math.sin((startAngle * Math.PI) / 180);
                      const x2 = 100 + 70 * Math.cos((endAngle * Math.PI) / 180);
                      const y2 = 100 + 70 * Math.sin((endAngle * Math.PI) / 180);
                      
                      const colors = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981'];
                      
                      acc.elements.push(
                        <path
                          key={resource}
                          d={`M 100 100 L ${x1} ${y1} A 70 70 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                          fill={colors[index % colors.length]}
                          className="animate-grow-donut"
                          style={{ animationDelay: `${index * 0.2}s` }}
                        />
                      );
                      
                      acc.currentAngle = endAngle;
                      return acc;
                    }, { currentAngle: -90, elements: [] }).elements}
                    
                    {/* Center Circle */}
                    <circle cx="100" cy="100" r="35" fill="#111827" />
                    
                    {/* Center Text */}
                    <text x="100" y="95" fill="white" fontSize="12" textAnchor="middle" dominantBaseline="middle">
                      System
                    </text>
                    <text x="100" y="110" fill="white" fontSize="12" textAnchor="middle" dominantBaseline="middle">
                      Usage
                    </text>
                  </svg>
                </div>
                
                {/* Legend */}
                <div className="mt-4 space-y-2">
                  {Object.entries(chartData.systemUsage).map(([resource, percentage], index) => {
                    const colors = ['bg-red-600', 'bg-yellow-600', 'bg-blue-600', 'bg-green-600'];
                    return (
                      <div key={resource} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`} />
                          <span className="text-gray-300 text-sm capitalize">{resource}</span>
                        </div>
                        <span className="text-gray-400 text-sm">{percentage}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/admin/admins"
                  className="flex items-center gap-3 p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <span>➕</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Create Admin</p>
                    <p className="text-gray-400 text-sm">Add new administrator</p>
                  </div>
                </Link>
                
                <button
                  onClick={fetchMessages}
                  className="flex items-center gap-3 p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span>🔄</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Refresh Data</p>
                    <p className="text-gray-400 text-sm">Update dashboard</p>
                  </div>
                </button>
                
                <button
                  className="flex items-center gap-3 p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <span>📊</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">View Reports</p>
                    <p className="text-gray-400 text-sm">Analytics & insights</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {messages.slice(0, 5).map(message => (
                <div key={message.id} className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span>💬</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">New message from {message.name}</p>
                    <p className="text-gray-400 text-sm">{message.email} • {new Date(message.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className="text-gray-400 text-sm">{new Date(message.createdAt).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* System Tab */}
        {activeTab === 'system' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">System Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Database</span>
                  <span className="text-green-400 animate-pulse">Connected</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">API Server</span>
                  <span className="text-green-400 animate-pulse">Running</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Last Backup</span>
                  <span className="text-gray-300">2 hours ago</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Performance</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">CPU Usage</span>
                    <span className="text-gray-300">{chartData.systemUsage.cpu}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-linear-to-r from-green-500 to-yellow-500 h-3 rounded-full animate-progress-bar"
                      style={{width: `${chartData.systemUsage.cpu}%`}}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Memory</span>
                    <span className="text-gray-300">{chartData.systemUsage.memory}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-linear-to-r from-yellow-500 to-orange-500 h-3 rounded-full animate-progress-bar"
                      style={{width: `${chartData.systemUsage.memory}%`}}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Disk</span>
                    <span className="text-gray-300">{chartData.systemUsage.disk}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-linear-to-r from-blue-500 to-purple-500 h-3 rounded-full animate-progress-bar"
                      style={{width: `${chartData.systemUsage.disk}%`}}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Network</span>
                    <span className="text-gray-300">{chartData.systemUsage.network}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-linear-to-r from-purple-500 to-pink-500 h-3 rounded-full animate-progress-bar"
                      style={{width: `${chartData.systemUsage.network}%`}}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Logs Tab */}
        {activeTab === 'logs' && (
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">System Logs</h2>
            <div className="space-y-2">
              <div className="p-3 bg-gray-800 rounded font-mono text-sm">
                <span className="text-gray-400">[2024-01-15 10:30:45]</span> <span className="text-green-400">INFO</span> Admin login successful
              </div>
              <div className="p-3 bg-gray-800 rounded font-mono text-sm">
                <span className="text-gray-400">[2024-01-15 10:25:12]</span> <span className="text-blue-400">INFO</span> Database backup completed
              </div>
              <div className="p-3 bg-gray-800 rounded font-mono text-sm">
                <span className="text-gray-400">[2024-01-15 10:15:33]</span> <span className="text-yellow-400">WARN</span> High memory usage detected
              </div>
              <div className="p-3 bg-gray-800 rounded font-mono text-sm">
                <span className="text-gray-400">[2024-01-15 10:00:00]</span> <span className="text-green-400">INFO</span> System startup completed
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Profile Settings */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Profile Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={adminProfile?.name || ''}
                    onChange={(e) => setAdminProfile(prev => prev ? {...prev, name: e.target.value} : null)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={adminProfile?.email || user?.email || ''}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled
                  />
                </div>
              </div>
            </div>
            
            {/* System Settings */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">System Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Notifications</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500" 
                      defaultChecked={true}
                    />
                    <span className="text-gray-400">Send email alerts for new messages</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Session Timeout</label>
                  <select className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Backup Frequency</label>
                  <select className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Maintenance Mode</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500" 
                    />
                    <span className="text-gray-400">Enable maintenance mode (disables public access)</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Security Settings */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Security Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Two-Factor Authentication</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-purple-600 bg-gray-800 border-gray-600 rounded focus:ring-purple-500" 
                    />
                    <span className="text-gray-400">Require 2FA for admin login</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">IP Whitelist</label>
                  <textarea
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={3}
                    placeholder="Enter allowed IP addresses (one per line)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Session Management</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      View Active Sessions
                    </button>
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                      Terminate All Sessions
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex justify-end gap-4">
              <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                Cancel
              </button>
              <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                Save Settings
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-gray-400">
              <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-lg">Loading...</span>
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
            <h3 className="text-red-200 text-lg font-medium mb-2">Error loading data</h3>
            <p className="text-red-300/80 mb-4">{error}</p>
            <button
              onClick={() => {
                fetchAdmins();
                fetchMessages();
              }}
              className="px-4 py-2 bg-red-800 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && activeTab === "messages" && (
          <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-800 border-b border-gray-700">
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {messages.map((message) => (
                    <tr key={message.id} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {message.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {message.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-900/30 text-blue-300 border border-blue-700">
                          {message.projectType || "General"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <button
                          onClick={() => handleDeleteMessage(message.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                          title="Delete message"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!loading && !error && activeTab === "admins" && (
          <div className="space-y-6">
            {/* Admin Type Tabs */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
              <div className="flex space-x-1">
                <button
                  onClick={() => setAdminSubTab('admins')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    adminSubTab === 'admins'
                      ? 'bg-blue-900 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <span className="text-lg">👥</span>
                  <span>Admins</span>
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {admins.filter(admin => admin.role === 'ADMIN').length}
                  </span>
                </button>
                <button
                  onClick={() => setAdminSubTab('superadmins')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    adminSubTab === 'superadmins'
                      ? 'bg-purple-900 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <span className="text-lg">👑</span>
                  <span>Super Admins</span>
                  <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                    {admins.filter(admin => admin.role === 'SUPER_ADMIN').length}
                  </span>
                </button>
              </div>
            </div>

            {/* Admins Table */}
            {adminSubTab === 'admins' && (
              <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-800">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Regular Admins</h3>
                    <span className="text-sm text-gray-400">
                      {admins.filter(admin => admin.role === 'ADMIN').length} total admins
                    </span>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-800 border-b border-gray-700">
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {admins.filter(admin => admin.role === 'ADMIN').map((admin) => (
                        <tr key={admin.id} className="hover:bg-gray-800/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {admin.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-900/30 text-blue-300 border border-blue-700">
                              {admin.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {new Date(admin.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEditAdmin(admin)}
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                                title="Edit admin"
                              >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteAdmin(admin.id)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                                title="Delete admin"
                              >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Super Admins Table */}
            {adminSubTab === 'superadmins' && (
              <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-800">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Super Admins</h3>
                    <span className="text-sm text-gray-400">
                      {admins.filter(admin => admin.role === 'SUPER_ADMIN').length} total super admins
                    </span>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-800 border-b border-gray-700">
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Created
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {admins.filter(admin => admin.role === 'SUPER_ADMIN').map((admin) => (
                        <tr key={admin.id} className="hover:bg-gray-800/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {admin.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-900/30 text-purple-300 border border-purple-700">
                              {admin.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {new Date(admin.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEditAdmin(admin)}
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                                title="Edit admin"
                              >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              {admin.id !== user?.id && (
                                <button
                                  onClick={() => handleDeleteAdmin(admin.id)}
                                  className="text-red-400 hover:text-red-300 transition-colors"
                                  title="Delete admin"
                                >
                                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
        </div>
      </div>

      {/* Edit Admin Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-white mb-4">Edit Admin</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => handleEditFormChange('name', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter admin name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => handleEditFormChange('email', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter admin email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                <select
                  value={editForm.role}
                  onChange={(e) => handleEditFormChange('role', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="SUPER_ADMIN">Super Admin</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setEditModalOpen(false);
                  setEditingAdmin(null);
                }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateAdmin}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                Update Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
