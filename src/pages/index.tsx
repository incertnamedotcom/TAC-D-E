import { Link } from "react-router-dom";
import { motion } from "motion/react";

const DISCORD = "https://discord.gg/8HpRpHsHVT";
const HERO_IMAGE = "https://i.ibb.co/cSSmjtWL/range.png";
const FOOTER_LOGO = "https://i.ibb.co/DP0007hy/footer-logo-1.png";
const NAVBAR_COIN = "https://i.imgur.com/xEtxsCw.png";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      
      {/* ── FULL-SCREEN IMAGE (no HOLD THE LINE text) ── */}
      <section className="relative min-h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          initial={{ y: 0 }}
          whileInView={{ y: -40 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        {/* Side fade only */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-10" />
      </section>

      {/* ── ABOUT US ── */}
      <section id="about" className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{ backgroundImage: `url(https://i.imgur.com/DCjut3E.jpeg)` }}
          initial={{ y: 0 }}
          whileInView={{ y: -40 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-10" />

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-[#b91c1c]" />
              <p className="text-[#b91c1c] text-sm uppercase tracking-[0.25em] font-medium">
                NAVAL SPECIAL WARFARE
              </p>
            </div>

            <h2 className="font-heading text-5xl md:text-7xl tracking-wide text-white mb-8 leading-none">
              ABOUT US
            </h2>

            <div className="space-y-6 text-white/85 text-lg md:text-xl leading-relaxed mb-10">
              <p>
                Tactical Development & Evaluations Group is a Naval Special Warfare–styled unit built around the structure and standards of a DEVGRU element. We focus on tactics development, evaluation of TTPs, and the execution of high-end special operations.
              </p>
              <p>
                The standard is deliberate. Training is realistic. The work is not for everyone.
              </p>
            </div>

            <Link to="/careers">
              <button className="group relative bg-white hover:bg-[#b91c1c] text-black hover:text-white font-semibold tracking-widest uppercase text-sm px-10 py-4 transition-all duration-300">
                Find Your Path
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#b91c1c] group-hover:w-full transition-all duration-300" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── APPLY NOW (CTA) ── */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Background logo – Naval Special Warfare navbar coin with same parallax shake */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
          initial={{ y: 0 }}
          whileInView={{ y: -40 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          <img
            src={NAVBAR_COIN}
            alt=""
            className="w-[min(85vw,820px)] h-auto object-contain opacity-[0.08] select-none"
          />
        </motion.div>

        {/* Soft vignette so the logo fades cleanly into the black */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,black_75%)]" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 py-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-white/55 text-xs sm:text-sm uppercase tracking-[0.35em] font-medium mb-6"
          >
            Your Future Is Waiting
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide text-white mb-10 leading-none"
          >
            APPLY NOW
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <Link to="/careers">
              <button className="group relative border border-white/40 hover:border-white text-white font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm px-10 py-3.5 transition-all duration-300 hover:bg-white hover:text-black">
                Get Started
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#b91c1c] group-hover:w-full transition-all duration-300" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="w-full bg-black border-t border-zinc-800 mt-auto">
        <div className="w-full px-3 sm:px-5 md:px-8 lg:px-10 xl:px-12">

          {/* Top half – Logo left, Mission right (title left-aligned) */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 py-14 md:py-16">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <img 
                src={FOOTER_LOGO} 
                alt="TACDEV" 
                className="h-16 md:h-20 w-auto object-contain"
              />
            </div>

            {/* Mission – title left-aligned above text */}
            <div className="lg:max-w-xl xl:max-w-2xl">
              <h4 className="text-white text-sm uppercase tracking-[0.3em] font-medium mb-4 text-left">
                MISSION
              </h4>
              <p className="text-white/70 text-sm md:text-base leading-relaxed text-left">
                The United States is a maritime nation, and the U.S. Navy protects America at sea. Alongside our allies and partners, we defend freedom, preserve economic prosperity and keep the seas open and free.
              </p>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-zinc-700" />

          {/* Bottom half – Recruitment & Get in Touch more centered */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 py-12 md:py-14">
            
            {/* Join Discord */}
            <div className="md:col-span-2 space-y-6">
              <a 
                href={DISCORD} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-white hover:bg-[#b91c1c] text-black hover:text-white font-semibold tracking-widest uppercase text-xs px-5 py-2.5 transition-all duration-300"
              >
                Join Discord
              </a>
            </div>

            {/* Spacer to help center the middle columns */}
            <div className="hidden md:block md:col-span-1" />

            {/* RECRUITMENT – more centered */}
            <div className="md:col-span-2">
              <h4 className="text-[#b91c1c] text-xs uppercase tracking-[0.25em] font-medium mb-5">
                Recruitment
              </h4>
              <div className="space-y-3">
                <Link to="/how-to-join" className="block text-sm tracking-widest text-white/75 hover:text-white transition-colors">
                  How to Join
                </Link>
                <Link to="/requirements" className="block text-sm tracking-widest text-white/75 hover:text-white transition-colors">
                  Requirements
                </Link>
                <a href={DISCORD} target="_blank" rel="noopener noreferrer" className="block text-sm tracking-widest text-white/75 hover:text-white transition-colors">
                  Apply Now
                </a>
              </div>
            </div>

            {/* GET IN TOUCH – more centered */}
            <div className="md:col-span-2">
              <h4 className="text-[#b91c1c] text-xs uppercase tracking-[0.25em] font-medium mb-5">
                Get in Touch
              </h4>
              <div className="space-y-3">
                <Link to="/faq" className="block text-sm tracking-widest text-white/75 hover:text-white transition-colors">
                  FAQs
                </Link>
                <Link to="/career-assessment" className="block text-sm tracking-widest text-white/75 hover:text-white transition-colors">
                  Career Assessment
                </Link>
                <a href={DISCORD} target="_blank" rel="noopener noreferrer" className="block text-sm tracking-widest text-white/75 hover:text-white transition-colors">
                  Find a Recruiter
                </a>
                <a href={DISCORD} target="_blank" rel="noopener noreferrer" className="block text-sm tracking-widest text-white/75 hover:text-white transition-colors">
                  Contact
                </a>
              </div>
            </div>

            {/* Spacer */}
            <div className="hidden md:block md:col-span-1" />

            {/* CONNECT */}
            <div className="md:col-span-4">
              <h4 className="text-white text-sm uppercase tracking-[0.3em] font-medium mb-1">
                Connect
              </h4>
              <p className="text-white/45 text-xs tracking-widest uppercase mb-6">
                Get Social With Us
              </p>
              
              <div className="flex items-center gap-5 flex-wrap">
                <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="X">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.youtube.com/@tacde4" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors" 
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a 
                  href={DISCORD} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors" 
                  aria-label="Discord"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0 a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.874.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom legal bar */}
          <div className="border-t border-zinc-800 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <p className="text-white/35 text-xs tracking-wider">
                © 2026 TACDEV. All rights reserved.
              </p>
              
              <p className="text-white/30 text-[11px] leading-relaxed max-w-3xl text-left md:text-right">
                TACDEV is an independent, fictional Arma 3 community project. We have no connection to DEVGRU, the U.S. Navy, JSOC, USSOCOM, or any actual military organization. Everything on this site, including names, procedures, structure, branding, and content, is purely fictional and created for community purposes.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}