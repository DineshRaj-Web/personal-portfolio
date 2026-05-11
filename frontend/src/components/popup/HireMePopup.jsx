import { motion } from "framer-motion";
import { useState } from "react";

const HireMePopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);

    try {
      // Send data to backend
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.category,
          message: formData.message
        })
      });

      if (response.ok) {
        setSubmitMessage("Thank you for your interest! I'll get back to you soon.");
        setFormData({
          name: '',
          email: '',
          phone: '',
          category: '',
          message: ''
        });
        setErrors({});
        // Auto-close popup after 1 second
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage("Failed to send message. Is the server running?");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(""), 5000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/85"
        onClick={onClose}
      />

      {/* Popup Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative bg-black/90 border border-white/20 rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header - Coder Style */}
        <div className="mb-6">
          {/* Terminal command header */}
          <motion.div
            className="font-mono text-sm mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 text-cyan-300/80 mb-2">
              <span className="animate-pulse">❯</span>
              <span>hire</span>
              <span className="text-purple-300/80">--developer</span>
              <span className="text-gray-400">--interactive</span>
            </div>
            <div className="text-green-300/60 text-xs">
              Initializing hiring interface... ✓
            </div>
          </motion.div>

          {/* Code-style title */}
          <div className="font-mono text-lg mb-4">
            <motion.div
              className="text-purple-300/80"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              const hiring = {"{"}
            </motion.div>
            <motion.div
              className="ml-4 text-cyan-300/80"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              status: "Let's discuss your project"
            </motion.div>
            <motion.div
              className="text-purple-300/80"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {"}"};
            </motion.div>
          </div>

          {/* Code comment description */}
          <motion.div
            className="font-mono text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="text-green-300/80">
              {"//"} Fill out the form below and I'll get back to you within 24 hours.
            </div>
          </motion.div>
        </div>

        {/* Form - Coder Style */}
        <motion.form
          onSubmit={handleSubmit}
          className="font-mono space-y-6"
          noValidate
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {/* Name Input */}
          <div className="flex items-start gap-3">
            <span className="text-cyan-400/80 mt-1">❯</span>
            <div className="flex-1">
              <div className="text-purple-300/80 text-sm mb-1">const name =</div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full bg-black/30 border rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors ${errors.name ? 'border-red-500' : 'border-white/20'}`}
                placeholder='"Your Name"'
              />
              {errors.name && <p className="text-red-500 text-xs mt-1 font-mono">{errors.name}</p>}
            </div>
          </div>

          {/* Email Input */}
          <div className="flex items-start gap-3">
            <span className="text-cyan-400/80 mt-1">❯</span>
            <div className="flex-1">
              <div className="text-purple-300/80 text-sm mb-1">const email =</div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-black/30 border rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors ${errors.email ? 'border-red-500' : 'border-white/20'}`}
                placeholder='"your@email.com"'
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 font-mono">{errors.email}</p>}
            </div>
          </div>

          {/* Phone Input */}
          <div className="flex items-start gap-3">
            <span className="text-cyan-400/80 mt-1">❯</span>
            <div className="flex-1">
              <div className="text-purple-300/80 text-sm mb-1">const phone =</div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                placeholder='"+91 98765 43210"'
              />
            </div>
          </div>

          {/* Category Select */}
          <div className="flex items-start gap-3">
            <span className="text-cyan-400/80 mt-1">❯</span>
            <div className="flex-1">
              <div className="text-purple-300/80 text-sm mb-1">const projectType =</div>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors appearance-none"
              >
                <option value="" className="bg-black">Select project type...</option>
                <option value="frontend" className="bg-black">Frontend Development</option>
                <option value="fullstack" className="bg-black">Full Stack Application</option>
                <option value="freelance" className="bg-black">Freelance Project</option>
                <option value="career" className="bg-black">Career Opportunity</option>
              </select>
            </div>
          </div>

          {/* Message Textarea */}
          <div className="flex items-start gap-3">
            <span className="text-cyan-400/80 mt-1">❯</span>
            <div className="flex-1">
              <div className="text-purple-300/80 text-sm mb-1">const message =</div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`w-full bg-black/30 border rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none ${errors.message ? 'border-red-500' : 'border-white/20'}`}
                placeholder='"Tell me about your project..."'
              />
              {errors.message && <p className="text-red-500 text-xs mt-1 font-mono">{errors.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-linear-to-r from-cyan-500 to-purple-600 text-white font-mono py-3 rounded-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-cyan-400/80">❯</span> {isSubmitting ? "Sending..." : "Send Message"}
          </motion.button>

          {/* Success/Error Message */}
          {submitMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center font-mono text-sm ${
                submitMessage.includes("Failed") ? "text-red-400" : "text-green-400"
              }`}
            >
              {submitMessage}
            </motion.div>
          )}
        </motion.form>
      </motion.div>
    </div>
  );
};

export default HireMePopup;
