import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  
  const contactRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(event.target as Node)) {
        setContactOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const contactItems = [
    { label: "INQUIRIES", path: "/inquiries" },
    { label: "FAQ", path: "/faq" },
    { label: "CONTACT INFORMATION", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="pt-8 md:pt-10 px-6 md:px-12 pb-5 flex items-start justify-between">
        
        {/* Left - Logo + Socials */}
        <div className="flex flex-col items-start gap-5">
          <Link to="/">
            <img
              src="https://i.imgur.com/xEtxsCw.png"
              alt="TACDEV"
              className="h-28 md:h-32 lg:h-36 w-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300"
            />
          </Link>

          <div className="flex items-center gap-6 ml-1">
            <a href="#" className="text-white/80 hover:text-white transition-colors" aria-label="Instagram">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors" aria-label="X">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a 
              href="https://www.youtube.com/@tacde4" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors" 
              aria-label="YouTube"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Center - Navigation Links */}
        <div className="hidden md:flex items-center gap-10 text-[15px] font-medium tracking-[0.15em] pt-6 absolute left-1/2 -translate-x-1/2">
          
          {/* ABOUT Dropdown */}
          <div className="relative" ref={aboutRef}>
            <button
              onClick={() => {
                setAboutOpen(!aboutOpen);
                setContactOpen(false);
              }}
              className={`flex items-center gap-1.5 hover:text-[#b91c1c] transition-colors duration-200 ${
                aboutOpen || isActive('/about') ? 'text-[#b91c1c]' : 'text-white'
              }`}
            >
              ABOUT
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {aboutOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-[#0a0a0a] border border-white/10 shadow-2xl z-50"
                >
                  <div className="py-2">
                    <Link
                      to="/about/mission"
                      onClick={() => setAboutOpen(false)}
                      className="block px-5 py-3 text-[13px] tracking-[0.12em] text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      OUR MISSION
                    </Link>
                    <Link
                      to="/about/values"
                      onClick={() => setAboutOpen(false)}
                      className="block px-5 py-3 text-[13px] tracking-[0.12em] text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      OUR VALUES
                    </Link>
                    <Link
                      to="/about/standards"
                      onClick={() => setAboutOpen(false)}
                      className="block px-5 py-3 text-[13px] tracking-[0.12em] text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      OUR STANDARDS
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/careers"
            className={`hover:text-[#b91c1c] transition-colors duration-200 ${
              isActive('/careers') ? 'text-[#b91c1c]' : 'text-white'
            }`}
          >
            CAREERS
          </Link>

          <Link
            to="/videos"
            className={`hover:text-[#b91c1c] transition-colors duration-200 ${
              isActive('/videos') ? 'text-[#b91c1c]' : 'text-white'
            }`}
          >
            VIDEOS
          </Link>

          <Link
            to="/gallery"
            className={`hover:text-[#b91c1c] transition-colors duration-200 ${
              isActive('/gallery') ? 'text-[#b91c1c]' : 'text-white'
            }`}
          >
            PHOTO GALLERY
          </Link>

          {/* CONTACT Dropdown */}
          <div className="relative" ref={contactRef}>
            <button
              onClick={() => {
                setContactOpen(!contactOpen);
                setAboutOpen(false);
              }}
              className={`flex items-center gap-1.5 hover:text-[#b91c1c] transition-colors duration-200 ${
                contactOpen ? 'text-[#b91c1c]' : 'text-white'
              }`}
            >
              CONTACT
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${contactOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {contactOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 bg-[#0a0a0a] border border-white/10 shadow-2xl z-50"
                >
                  <div className="py-2">
                    {contactItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setContactOpen(false)}
                        className="block px-5 py-3 text-[13px] tracking-[0.12em] text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* PERSCOM (replaces APPLY) */}
          <Link
            to="/personnel"
            className={`hover:text-[#b91c1c] transition-colors duration-200 ${
              isActive('/personnel') ? 'text-[#b91c1c]' : 'text-white'
            }`}
          >
            PERSCOM
          </Link>
        </div>

{/* Right - START YOUR JOURNEY */}
<div className="hidden md:flex items-center pt-3.5">
  <Link
    to="/apply"
    className="border border-white/70 text-white text-[12px] font-medium tracking-[0.22em] uppercase px-6 py-2 hover:border-[#b91c1c] hover:text-[#b91c1c] transition-all duration-300"
  >
    START YOUR JOURNEY
  </Link>
</div>

        {/* Mobile Menu */}
        <div className="md:hidden pt-2">
          <button className="text-white text-3xl">☰</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;