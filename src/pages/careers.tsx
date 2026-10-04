import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { branchCards } from "./careers/_lib/data";

const DISCORD = "https://discord.gg/8HpRpHsHVT";

const Careers = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-0 relative">
      
      {/* Fine white-dot grain */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.022] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-28">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-[#b91c1c] text-sm uppercase tracking-[0.25em] mb-4 font-medium">
            ENLISTMENT CENTER
          </p>
          
          <h1 className="font-heading text-6xl md:text-7xl tracking-wide text-white mb-6">
            CAREERS
          </h1>
          
          <div className="w-14 h-[2px] bg-[#b91c1c] mx-auto mb-10" />

          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl tracking-wide text-white mb-6">
              Your Steps to Success
            </h2>
            
            <p className="text-white/65 text-base md:text-lg leading-relaxed">
              Whether you join as an operator or a specialist, several factors will shape your path — your background, current skills, and long-term goals. We’ll help you determine the right steps forward so you can become the operator you were meant to be.
            </p>
          </div>
        </motion.div>

        {/* Pick Your Branch */}
        <div className="text-center mb-14">
          <h2 className="font-heading text-2xl md:text-3xl tracking-widest text-white uppercase font-bold">
            PICK YOUR BRANCH
          </h2>
        </div>

        {/* Career Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {branchCards.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                to={c.href}
                className="group relative block aspect-[3/4] bg-zinc-900/80 border border-zinc-800 hover:border-[#b91c1c]/60 overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-full h-full max-h-[55%] flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                    <img 
                      src={c.logo} 
                      alt={c.label}
                      className="w-full h-full max-h-[180px] object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-7 bg-gradient-to-t from-black via-black/85 to-transparent">
                  <h3 className="font-heading text-2xl md:text-3xl tracking-wide text-white uppercase text-center">
                    {c.label}
                  </h3>
                  <div className="w-12 h-[2px] bg-[#b91c1c] mt-4 mx-auto transition-all duration-300 group-hover:w-20" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ── NOT SURE? SECTION ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mt-32 relative border border-zinc-800 bg-zinc-900/40"
        >
          <div className="px-8 md:px-16 py-16 md:py-20 text-center">
            <p className="text-[#b91c1c] text-xs uppercase tracking-[0.35em] font-medium mb-5">
              Career Assessment
            </p>
            
            <h2 className="font-heading text-4xl md:text-5xl tracking-wide text-white mb-6">
              NOT SURE WHICH PATH?
            </h2>
            
            <p className="text-white/55 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Take a short assessment to help identify which special operations path 
              best matches your background, skills, and goals.
            </p>

            <Link
              to="/career-assessment"
              className="inline-block border border-white/80 text-white font-semibold tracking-widest uppercase text-sm px-12 py-3.5 hover:bg-white hover:text-black transition-all duration-300"
            >
              TAKE THE ASSESSMENT
            </Link>
          </div>
        </motion.div>

        {/* Bottom Quote + CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-32 text-center"
        >
          <p className="font-heading text-4xl md:text-5xl tracking-wide text-white leading-tight mb-4">
            PAIN IS TEMPORARY<br />
            PRIDE IS FOREVER
          </p>
          <p className="text-[#b91c1c] text-sm uppercase tracking-[0.25em] mb-10">
            — NAVAL SPECIAL WARFARE
          </p>

          <Link
            to="/apply"
            className="inline-block border-2 border-white text-white font-semibold tracking-widest uppercase text-sm px-14 py-5 hover:bg-white hover:text-black transition-all duration-300"
          >
            ENLIST NOW
          </Link>
        </motion.div>

      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-black border-t border-zinc-800 relative z-10">
        <div 
          className="pointer-events-none absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative max-w-[90rem] mx-auto px-8 md:px-16">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 py-16 md:py-20">
            
            <div className="md:col-span-4 space-y-6">
              <img 
                src="https://i.imgur.com/xEtxsCw.png" 
                alt="TACDEV" 
                className="h-20 w-auto object-contain opacity-90"
              />
              <p className="text-white/55 text-sm leading-relaxed max-w-xs">
                Naval Special Warfare element. Discipline. Realism. Trust.
              </p>
              <a 
                href={DISCORD} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-white hover:bg-[#b91c1c] text-black hover:text-white font-semibold tracking-widest uppercase text-xs px-5 py-2.5 transition-all duration-300"
              >
                Join Discord
              </a>
            </div>

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

            <div className="md:col-span-2">
              <h4 className="text-[#b91c1c] text-xs uppercase tracking-[0.25em] font-medium mb-5">
                Resources
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

            <div className="md:col-span-4 md:pl-8">
              <h4 className="text-white text-sm uppercase tracking-[0.3em] font-medium mb-1">
                Connect
              </h4>
              <p className="text-white/45 text-xs tracking-widest uppercase mb-6">
                Get Social With Us
              </p>
              
              <div className="flex items-center gap-5">
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
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <p className="text-white/35 text-xs tracking-wider">
                © 2025 TACDEV. All rights reserved.
              </p>
              
              <p className="text-white/30 text-[11px] leading-relaxed max-w-2xl text-left md:text-right">
                TACDEV is an independent, fictional Arma 3 community project. We have no connection to DEVGRU, the U.S. Navy, JSOC, USSOCOM, or any actual military organization. Everything on this site, including names, procedures, structure, branding, and content, is purely fictional and created for community purposes.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Careers;