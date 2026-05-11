import { motion } from "framer-motion";
import { useState } from "react";

const ContactForm = ({ formData, handleChange, handleSubmit, errors, isSubmitting, submitMessage }) => (
  <motion.form
    onSubmit={handleSubmit}
    className="font-mono space-y-6"
    noValidate
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5, duration: 0.6 }}
  >
    {/* Terminal-style form inputs */}
    <div className="space-y-4">
      {/* Name Input */}
      <div className="flex items-start gap-3">
        <span className="text-cyan-400/80 mt-1">❯</span>
        <div className="flex-1">
          <div className="text-purple-300/80 text-sm mb-1">const name =</div>
          <input
            id="name"
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
            id="email"
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
            id="phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-cyan-400 transition-colors"
            placeholder='"+"91 98765 43210"'
          />
        </div>
      </div>

      {/* Category Select */}
      <div className="flex items-start gap-3">
        <span className="text-cyan-400/80 mt-1">❯</span>
        <div className="flex-1">
          <div className="text-purple-300/80 text-sm mb-1">const projectType =</div>
          <select
            id="category"
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
            id="message"
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
    </div>

    {/* Submit Button */}
    <motion.button
      type="submit"
      disabled={isSubmitting}
      className="w-full mt-8 bg-linear-to-r from-cyan-500 to-purple-600 text-white font-mono py-3 rounded-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="text-cyan-400/80">❯</span> {isSubmitting ? "contact.send()" : "contact.send()"}
    </motion.button>

    {/* Success Message */}
    {submitMessage && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
      >
        <div className="text-green-400 font-mono text-sm">
          <span className="text-green-300">✓</span> {submitMessage}
        </div>
      </motion.div>
    )}
  </motion.form>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) tempErrors.message = "Message is required";

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length > 0) {
      // Explicitly define the order of fields to check top-to-bottom
      const fieldOrder = ["name", "email", "phone", "category", "message"];

      // Find the first field in the physical order that has an error
      const firstErrorKey = fieldOrder.find(key => tempErrors[key]);

      if (firstErrorKey) {
        const element = document.getElementById(firstErrorKey);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
        }
      }
      return false;
    }
    return true;
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
      const response = await fetch("https://personal-portfolio-backend-wgw1.onrender.com/contact", {
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
        alert("Message sent ✅");
        setSubmitMessage("Message received. I'll be in touch within 24 hours.");
        setFormData({ name: "", email: "", phone: "", category: "", message: "" });
        setErrors({});
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send message. Is the server running?");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(""), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="grow px-6 md:px-16 py-20 flex items-center justify-center">
        <div className="max-w-7xl w-full">

          {/* ==================== MOBILE VIEW (md:hidden) ==================== */}
          {/* Vertical Stack: Text -> Form -> Custom Links */}
          <div className="md:hidden flex flex-col gap-12 max-w-4xl mx-auto">

            {/* 1. Hero Text Section - Coder Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6"
            >
              {/* Terminal-style section header */}
              <motion.div
                className="font-mono text-sm mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="flex items-center justify-center gap-2 text-cyan-300/80 mb-2">
                  <span className="animate-pulse">❯</span>
                  <span>contact</span>
                  <span className="text-purple-300/80">--init</span>
                  <span className="text-gray-400">--interactive</span>
                </div>
                <div className="text-green-300/60 text-xs">
                  Initializing contact interface... ✓
                </div>
              </motion.div>

              {/* Code-style main title */}
              <div className="font-mono text-lg space-y-2 mb-6">
                <motion.div
                  className="text-purple-300/80"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  const contact = {"{"}
                </motion.div>
                <motion.div
                  className="ml-4 text-cyan-300/80"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  message: "Let's Build Something
                </motion.div>
                <motion.div
                  className="ml-8 text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  Extraordinary
                </motion.div>
                <motion.div
                  className="text-cyan-300/80"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  "
                </motion.div>
                <motion.div
                  className="text-purple-300/80"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  {"}"};
                </motion.div>
              </div>

              {/* Code comment description */}
              <motion.div
                className="font-mono text-sm space-y-2 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                <div className="text-green-300/80">
                  {"/*"}
                </div>
                <div className="text-gray-300 ml-4 leading-relaxed">
                  I'm currently accepting new projects and opportunities.<br/>
                  Whether you have a clear roadmap or just a spark of an idea,<br/>
                  let's discuss how we can bring it to life with precision and creativity.
                </div>
                <div className="text-green-300/80">
                  {"*/"}
                </div>
              </motion.div>
            </motion.div>

            {/* 2. Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 p-6 rounded-3xl border border-white/10"
            >
              <ContactForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                errors={errors}
                isSubmitting={isSubmitting}
                submitMessage={submitMessage}
              />
            </motion.div>

            {/* 3. Contact Links - Mobile Specific Layout */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-4 pb-4"
            >
              {/* Terminal-style contact information */}
              <div className="font-mono space-y-6">
                {/* Email */}
                <motion.div
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <span className="text-cyan-400/80 mt-1">❯</span>
                  <div className="flex-1">
                    <div className="text-purple-300/80 text-sm mb-1">const email =</div>
                    <a
                      href="mailto:dinesh.apply.in@gmail.com"
                      className="text-yellow-300/80 font-mono text-sm hover:text-cyan-300 transition-colors"
                    >
                      "dinesh.apply.in@gmail.com"
                    </a>
                  </div>
                </motion.div>

                {/* LinkedIn */}
                <motion.div
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <span className="text-cyan-400/80 mt-1">❯</span>
                  <div className="flex-1">
                    <div className="text-purple-300/80 text-sm mb-1">const linkedin =</div>
                    <a
                      href="https://www.linkedin.com/in/dinesh-webdevelopment/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-300/80 font-mono text-sm hover:text-cyan-300 transition-colors"
                    >
                      "Dinesh Raj"
                    </a>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <span className="text-cyan-400/80 mt-1">❯</span>
                  <div className="flex-1">
                    <div className="text-purple-300/80 text-sm mb-1">const phone =</div>
                    <a
                      href="tel:+919080192044"
                      className="text-yellow-300/80 font-mono text-sm hover:text-cyan-300 transition-colors"
                    >
                      "+91 90801-92044"
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* ==================== DESKTOP VIEW (hidden md:grid) ==================== */}
          {/* Original Side-by-Side Grid Layout */}
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

            {/* Value Prop Side (Left) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Terminal-style section header */}
              <motion.div
                className="font-mono text-sm mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <div className="flex items-center gap-2 text-cyan-300/80 mb-2">
                  <span className="animate-pulse">❯</span>
                  <span>contact</span>
                  <span className="text-purple-300/80">--init</span>
                  <span className="text-gray-400">--interactive</span>
                </div>
                <div className="text-green-300/60 text-xs">
                  Initializing contact interface... ✓
                </div>
              </motion.div>

              <h2 className="text-cyan-500 font-bold tracking-widest uppercase mb-4">Contact Me</h2>

              {/* Code-style main title */}
              <div className="font-mono text-xl space-y-2 mb-8">
                <motion.div
                  className="text-purple-300/80"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  const contact = {"{"}
                </motion.div>
                <motion.div
                  className="ml-4 text-cyan-300/80"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  message: "Let's Build Something
                </motion.div>
                <motion.div
                  className="ml-8 text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-cyan-400 text-2xl"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  Extraordinary
                </motion.div>
                <motion.div
                  className="text-cyan-300/80"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  "
                </motion.div>
                <motion.div
                  className="text-purple-300/80"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  {"}"};
                </motion.div>
              </div>

              {/* Code comment description */}
              <motion.div
                className="font-mono text-base space-y-2 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="text-green-300/80">
                  {"/*"}
                </div>
                <div className="text-gray-300 ml-4 leading-relaxed">
                  I'm currently accepting new projects and opportunities.<br/>
                  Whether you have a clear roadmap or just a spark of an idea,<br/>
                  let's discuss how we can bring it to life with precision and creativity.
                </div>
                <div className="text-green-300/80">
                  {"*/"}
                </div>
              </motion.div>

              <div className="space-y-8">
                {/* Email - Coder Style */}
                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <span className="text-cyan-400/80 font-mono">❯</span>
                  <div className="font-mono">
                    <div className="text-purple-300/80 text-sm mb-1">const email =</div>
                    <a
                      href="mailto:dinesh.apply.in@gmail.com"
                      className="text-yellow-300/80 text-lg font-medium hover:text-cyan-400 transition-colors"
                    >
                      "dinesh.apply.in@gmail.com"
                    </a>
                  </div>
                </motion.div>

                {/* LinkedIn - Coder Style */}
                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <span className="text-cyan-400/80 font-mono">❯</span>
                  <div className="font-mono">
                    <div className="text-purple-300/80 text-sm mb-1">const linkedin =</div>
                    <a
                      href="https://www.linkedin.com/in/dinesh-webdevelopment/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-300/80 text-lg font-medium hover:text-cyan-400 transition-colors"
                    >
                      "Dinesh Raj"
                    </a>
                  </div>
                </motion.div>

                {/* Phone - Coder Style */}
                <motion.div
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <span className="text-cyan-400/80 font-mono">❯</span>
                  <div className="font-mono">
                    <div className="text-purple-300/80 text-sm mb-1">const phone =</div>
                    <a
                      href="tel:+919080192044"
                      className="text-yellow-300/80 text-lg font-medium hover:text-cyan-400 transition-colors"
                    >
                      "+91 90801-92044"
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Form Side (Right) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/5 p-6 md:p-12 rounded-3xl border border-white/10"
            >
              <ContactForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                errors={errors}
                isSubmitting={isSubmitting}
                submitMessage={submitMessage}
              />
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
