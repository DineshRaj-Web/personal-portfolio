import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useHireMe } from "../../context/HireMeContext";

const navItems = [
  { label: "Home", id: "" },
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" }
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { openHireMePopup } = useHireMe();

  const handleHomeClick = (e, isHomeLink) => {
    if (isHomeLink) {
      openHireMePopup();
    }
    setOpen(false);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (path) => {
    if (path === "") return location.pathname === "/";
    return location.pathname === `/${path}`;
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 px-6 py-6 pointer-events-none flex justify-between items-center"
      >
        {/* Logo - Floats Left */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pointer-events-auto"
        >
          <Link
            to="/"
            className="group flex items-center space-x-2"
            onClick={(e) => handleHomeClick(e, true)}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-black border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 overflow-hidden gpu-layer"
            >
              <img
                src="/DR-Logo.svg"
                alt="Logo"
                className="w-full h-full object-contain p-1.5"
              />
            </motion.div>
          </Link>
        </motion.div>

        {/* Desktop Menu - Floats Center (The "Oval") */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden lg:flex pointer-events-auto px-2 py-2 bg-black border border-white/10 rounded-full shadow-lg items-center gap-1 gpu-layer"
        >
          {navItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
            >
              <Link
                to={`/${item.id}`}
                onClick={(e) => handleHomeClick(e, item.id === "")}
                className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${isActive(item.id)
                  ? 'text-black bg-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Right Actions - Floats Right */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hidden lg:flex pointer-events-auto items-center space-x-3"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
           { /* <Link
              to="/Dinesh_Sample_Resume.pdf"
              target="_blank"
              className="px-5 py-2.5 bg-black/40 backdrop-blur-md border border-white/10 text-gray-300 text-sm font-medium rounded-full hover:bg-white/10 hover:text-white transition-all duration-300"
            >
              Resume
            </Link> */}
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openHireMePopup}
            className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full transition-transform duration-300 shadow-lg shadow-white/10"
          >
            Hire Me
          </motion.button>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:hidden pointer-events-auto"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 bg-black border border-white/10 rounded-full flex flex-col justify-center items-center space-y-1 text-white cursor-pointer hover:bg-white/10 transition-all duration-300 gpu-layer"
            onClick={() => setOpen(!open)}
          >
            <div className={`w-4 h-0.5 bg-current transition-all duration-300 ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
            <div className={`w-4 h-0.5 bg-current transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <div className={`w-4 h-0.5 bg-current transition-all duration-300 ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </motion.div>
        </motion.div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden absolute top-20 right-4 left-4 pointer-events-auto bg-black rounded-4xl border border-white/10 shadow-xl overflow-hidden z-50 p-1 gpu-layer"
            >
              {/* HUD Corner Brackets */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-cyan-500/30 rounded-tl-4xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-purple-500/30 rounded-br-4xl pointer-events-none" />

              <div className="p-8 space-y-8 relative">
                {/* Mobile Header Info */}
                <div className="flex justify-between items-end border-b border-white/5 pb-6">
                  <div className="space-y-1">
                    <span className="text-[0.55rem] font-mono text-cyan-400 font-black tracking-[0.3em] uppercase opacity-50 block">:: IDENTITY_OVERRIDE</span>
                    <span className="text-xl font-black italic tracking-tighter text-white uppercase leading-none">SYSTEM.nav</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[0.45rem] font-mono text-white/20 block tracking-widest uppercase mb-1">ENV_ID: 0xFC_MOBILE</span>
                    <div className="w-12 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1 }}
                        className="h-full bg-linear-to-r from-cyan-500 to-purple-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link
                        to={`/${item.id}`}
                        onClick={(e) => handleHomeClick(e, item.id === "")}
                        className={`group relative flex items-center justify-between px-6 py-4 transition-all duration-300 rounded-2xl ${isActive(item.id)
                          ? 'text-white bg-white/5 border border-white/10'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`font-mono text-[0.6rem] transition-colors duration-300 ${isActive(item.id) ? 'text-cyan-400' : 'text-white/10 group-hover:text-cyan-400/50'}`}>
                            0x{(index + 1).toString(16).padStart(2, '0')}
                          </span>
                          <span className="text-lg font-bold tracking-tight lowercase">
                            {isActive(item.id) && <span className="text-cyan-400 mr-2 opacity-50">/</span>}
                            {item.label}
                          </span>
                        </div>
                        {isActive(item.id) && (
                          <motion.div
                            layoutId="activeCircle"
                            className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col gap-4">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      openHireMePopup();
                      setOpen(false);
                    }}
                    className="w-full px-6 py-5 bg-white text-black text-xs font-black uppercase tracking-[0.4em] rounded-2xl transition-all duration-300 text-center shadow-[0_0_30px_rgba(255,255,255,0.1)] relative overflow-hidden group/motto"
                  >
                    <span className="relative z-10">{">"} EXECUTE_HIRE_PROTOCOL</span>
                  </motion.button>
                  <motion.div whileTap={{ scale: 0.95 }}>
                   {/* <Link
                      to="/Dinesh_Sample_Resume.pdf"
                      target="_blank"
                      onClick={() => setOpen(false)}
                      className="w-full px-6 py-5 bg-white/[0.03] border border-white/10 text-white text-xs font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-white/10 transition-all duration-300 text-center block"
                    >
                      VERSION_RESUME.pdf
                    </Link> */}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
