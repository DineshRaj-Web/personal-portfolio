import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useHireMe } from "../../context/HireMeContext";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const { openHireMePopup } = useHireMe();

  const socialLinks = [
    {
      name: "GitHub",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
      url: "https://github.com/DineshRaj-Web"
    },
    {
      name: "LinkedIn",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      url: "https://www.linkedin.com/in/dinesh-webdevelopment/"
    },
    {
      name: "X",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.134l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      url: "https://twitter.com"
    },
    {
      name: "Email",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
        </svg>
      ),
      url: "mailto:dinesh.apply.in@gmail.com"
    }
  ];

  const quickLinks = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Work", url: "/work" },
    { name: "Skills", url: "/skills" },
    { name: "Contact", url: "/contact" }
  ];

  const services = [
    { name: "Frontend Development", url: "/contact?service=frontend" },
    { name: "Full Stack Applications", url: "/contact?service=fullstack" },
    { name: "UI/UX Design", url: "/contact?service=uiux" },
    { name: "API Development", url: "/contact?service=api" },
    { name: "Performance Optimization", url: "/contact?service=optimization" }
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsSubscribing(true);
    setSubscribeMessage("");

    try {
      // Send email notification using EmailJS or similar service
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'YOUR_SERVICE_ID',
          template_id: 'YOUR_TEMPLATE_ID',
          user_id: 'YOUR_USER_ID',
          template_params: {
            to_email: 'dinesh@example.com',
            from_email: email,
            subject: 'New Newsletter Subscription',
            message: `New subscriber: ${email}`
          }
        })
      });

      if (response.ok) {
        setSubscribeMessage("Thank you for subscribing! Check your email for confirmation.");
        setEmail("");
      } else {
        // Fallback: Send to your backend API
        const fallbackResponse = await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email })
        });

        if (fallbackResponse.ok) {
          setSubscribeMessage("Successfully subscribed! You'll receive updates soon.");
          setEmail("");
        } else {
          setSubscribeMessage("Subscription failed. Please try again.");
        }
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setSubscribeMessage("Subscription failed. Please try again later.");
    } finally {
      setIsSubscribing(false);

      // Clear message after 5 seconds
      setTimeout(() => setSubscribeMessage(""), 5000);
    }
  };

  return (
    <footer className="relative bg-black pt-20 pb-10 overflow-hidden">
      {/* Premium Top Border Gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80 shadow-[0_0_15px_rgba(34,211,238,0.4)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent blur-sm opacity-60" />
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/15 via-purple-900/15 to-transparent" />
        <div className="absolute inset-0 opacity-10">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.1)]"
              style={{
                left: `${(i % 5) * 25}%`,
                top: `${Math.floor(i / 5) * 50}%`,
                width: '80px',
                height: '80px'
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-16 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">

          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4 sm:space-y-6 text-center sm:text-left font-mono col-span-1 sm:col-span-2 lg:col-span-1"
          >
            <div className="flex flex-col gap-2">
              <span className="text-[0.6rem] sm:text-[0.7rem] text-cyan-400 tracking-[0.2em] sm:tracking-[0.3em] font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">:: IDENTITY_MODULE</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-400 via-white to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                Dinesh Raj
              </h3>
            </div>
            <p className="text-gray-100 text-xs sm:text-sm md:text-base leading-relaxed max-w-xs sm:max-w-sm mx-auto sm:mx-0">
              <span className="text-cyan-400 font-bold">&gt;</span> Professional Software Engineer specializing in building exceptional digital experiences with modern web technologies.
            </p>
            {/* Mobile Social Icons */}
            <div className="flex sm:hidden gap-4 justify-center sm:justify-start">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center text-lg hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-300 text-gray-200"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
            {/* Desktop Social Icons */}
            <div className="hidden sm:flex gap-4 justify-center sm:justify-start">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -4, color: "#22d3ee" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 sm:w-11 sm:h-11 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center text-lg sm:text-xl hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300 text-gray-200"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links & Services Wrapper */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 font-mono">
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[0.7rem] sm:text-[0.85rem] text-cyan-400 tracking-[0.2em] sm:tracking-[0.3em] font-bold drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">:: Quick Links</span>
              </div>
              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.05, ease: "easeOut" }}
                  >
                    <Link
                      to={link.url}
                      onClick={() => {
                        if (link.url === "/") {
                          openHireMePopup();
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className="group text-gray-100 hover:text-cyan-400 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                    >
                      <span className="text-cyan-400 font-bold opacity-0 group-hover:opacity-100 transition-all drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">-&gt;</span>
                      <span className="group-hover:translate-x-1 transition-transform inline-block font-semibold lowercase tracking-wider text-xs sm:text-sm">{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[0.7rem] sm:text-[0.85rem] text-purple-400 tracking-[0.2em] sm:tracking-[0.3em] font-bold drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">:: Services</span>
              </div>
              <ul className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                {services.map((service) => (
                  <motion.li
                    key={service.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                  >
                    <Link
                      to={service.url}
                      className="group text-gray-100 hover:text-purple-400 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                    >
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full group-hover:bg-purple-500 group-hover:shadow-[0_0_12px_rgba(168,85,247,0.8)] transition-all" />
                      <span className="group-hover:translate-x-1 transition-transform inline-block font-semibold lowercase tracking-wider text-xs sm:text-sm">{service.name.replace(/\s+/g, '_')}()</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>


          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="space-y-4 sm:space-y-6 font-mono col-span-1 sm:col-span-2 lg:col-span-1"
          >
            <div className="flex flex-col gap-1 text-center sm:text-left">
              <span className="text-[0.7rem] sm:text-[0.85rem] text-emerald-400 tracking-[0.2em] sm:tracking-[0.3em] font-bold drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">:: Stay Connected</span>
            </div>
            <p className="text-gray-100 text-xs sm:text-sm text-center sm:text-left">
              <span className="text-emerald-400 font-bold">&gt;</span> Subscribe to get updates on new projects and tech insights.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3 sm:space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="root@identity.dev"
                className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-full text-xs sm:text-sm text-white placeholder-gray-600 focus:border-cyan-500/60 focus:bg-white/10 focus:outline-none transition-all duration-300"
                required
                disabled={isSubscribing}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, backgroundColor: "white", color: "black", boxShadow: "0 0 25px rgba(255,255,255,0.4)" }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubscribing}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/10 border border-white/20 text-white text-[0.65rem] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] rounded-full"
              >
                {isSubscribing ? "> INITIALIZING..." : "> EXECUTE_SUBSCRIBE"}
              </motion.button>

              {/* Success/Error Message */}
              {subscribeMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-2 sm:p-3 rounded-lg text-[0.65rem] sm:text-xs font-mono border ${subscribeMessage.includes("Thank you") || subscribeMessage.includes("Successfully")
                    ? "bg-green-500/10 border-green-500/30 text-green-400"
                    : "bg-red-500/10 border-red-500/30 text-red-400"
                    }`}
                >
                  <span className="opacity-50">[LOG]:</span> {subscribeMessage}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-12 sm:mt-16 md:mt-20 pt-6 sm:pt-8 md:pt-10 border-t border-white/10 flex flex-col gap-4 sm:gap-6 text-center font-mono text-[0.6rem] sm:text-[0.65rem] md:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase"
        >
          <div className="text-gray-200 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5">
            <span className="hover:text-white transition-colors cursor-default font-semibold">(c) {new Date().getFullYear()} DINESH_RAJ</span>
            <span className="hidden sm:block opacity-30">|</span>
            <span className="flex items-center gap-2 text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              SYSTEM_READY
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 text-gray-500">
            <span>Designed & Engineered by</span>
            <span className="text-white font-black px-3 py-1 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500 cursor-default">
              DINESH_RAJ
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

