import { useState } from "react";

const MessageTable = ({ messages, onDelete }) => {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    setDeletingId(id);
    
    // Optimistic update - remove from UI immediately
    onDelete(id);
    
    // Simulate API delay for better UX
    setTimeout(() => {
      setDeletingId(null);
    }, 300);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (messages.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-12 text-center">
        <div className="text-gray-500 mb-4">
          <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414a1 1 0 00-.707-.293H4" />
          </svg>
        </div>
        <h3 className="text-white text-lg font-medium mb-2">No messages found</h3>
        <p className="text-gray-400">There are no contact form messages to display.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800 border-b border-gray-700">
              <th className="text-left text-gray-300 font-mono text-sm py-4 px-6">Name</th>
              <th className="text-left text-gray-300 font-mono text-sm py-4 px-6">Email</th>
              <th className="text-left text-gray-300 font-mono text-sm py-4 px-6">Phone</th>
              <th className="text-left text-gray-300 font-mono text-sm py-4 px-6">Project Type</th>
              <th className="text-left text-gray-300 font-mono text-sm py-4 px-6">Message</th>
              <th className="text-left text-gray-300 font-mono text-sm py-4 px-6">Created At</th>
              <th className="text-left text-gray-300 font-mono text-sm py-4 px-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr
                key={message.id}
                className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors group"
              >
                <td className="py-4 px-6">
                  <div className="text-white font-medium">{message.name}</div>
                </td>
                <td className="py-4 px-6">
                  <a
                    href={`mailto:${message.email}`}
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    {message.email}
                  </a>
                </td>
                <td className="py-4 px-6">
                  <span className="text-gray-300">
                    {message.phone || "—"}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900 text-purple-200">
                    {message.projectType || "Not specified"}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <p className="text-gray-300 text-sm max-w-xs truncate">
                    {message.message}
                  </p>
                </td>
                <td className="py-4 px-6">
                  <span className="text-gray-400 text-sm">
                    {formatDate(message.createdAt)}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => handleDelete(message.id)}
                    disabled={deletingId === message.id}
                    className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete message"
                  >
                    {deletingId === message.id ? (
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden">
        {messages.map((message) => (
          <div
            key={message.id}
            className="border-b border-gray-800 p-4 hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-white font-medium">{message.name}</h3>
                <a
                  href={`mailto:${message.email}`}
                  className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors"
                >
                  {message.email}
                </a>
              </div>
              <button
                onClick={() => handleDelete(message.id)}
                disabled={deletingId === message.id}
                className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
              >
                {deletingId === message.id ? (
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                )}
              </button>
            </div>
            
            <div className="space-y-2 text-sm">
              {message.phone && (
                <div className="flex items-center text-gray-300">
                  <span className="text-gray-500 w-20">Phone:</span>
                  <span>{message.phone}</span>
                </div>
              )}
              <div className="flex items-center">
                <span className="text-gray-500 w-20">Project:</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-900 text-purple-200">
                  {message.projectType || "Not specified"}
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-gray-500 w-20 shrink-0">Message:</span>
                <p className="text-gray-300 line-clamp-3">{message.message}</p>
              </div>
              <div className="flex items-center text-gray-400 text-xs pt-2">
                <span className="w-20">Created:</span>
                <span>{formatDate(message.createdAt)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageTable;
