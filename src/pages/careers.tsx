import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const DISCORD = "https://discord.gg/8HpRpHsHVT";
const HERO_BG = "https://i.ibb.co/Kz6qd30w/51512512.png";
const FOOTER_LOGO = "https://i.ibb.co/DP0007hy/footer-logo-1.png";

const highPriorityRoles = [
  {
    slug: "eod",
    label: "EOD",
    nec: "M03A",
    fullName: "Explosive Ordnance Disposal Technician",
    image: "https://i.imgur.com/4H14H0j.jpg",
    href: "/careers/navy/eod",
  },
  {
    slug: "hm-atf",
    label: "HM",
    nec: "L02A",
    fullName: "Hospital Corpsman Advanced Technical Field",
    image: "https://i.imgur.com/AtWnhpx.png",
    href: "/careers/navy/corpsman",
  },
];

const specialOpsRoles = [
  { name: "Special Warfare Operator", href: "/careers/navy/seal" },
  { name: "Explosive Ordnance Disposal Technician", href: "/careers/navy/eod" },
  { name: "Hospital Corpsman Advanced Technical Field", href: "/careers/navy/corpsman" },
];

const Careers = () => {
  const [specOpsOpen, setSpecOpsOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative">

      {/* Fine white-dot grain */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.022] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── HERO ── */}
      <section className="relative h-[65vh] min-h-[480px] overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_BG})` }}
          initial={{ y: 0 }}
          whileInView={{ y: -40 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/40" />
        
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-32 bg-[#b91c1c]/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#b91c1c] text-sm uppercase tracking-[0.3em] mb-5 font-medium"
          >
            Enlistment Center
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl tracking-wide text-white uppercase mb-8"
          >
            Explore Careers
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-14 h-[2px] bg-[#b91c1c] mb-10"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="w-full max-w-lg"
          >
            <div className="relative border-b border-white/25 focus-within:border-[#b91c1c]/60 transition-colors pb-2">
              <input
                type="text"
                placeholder="Search by Role"
                className="w-full bg-transparent text-white placeholder:text-white/40 text-sm tracking-wide outline-none pr-10"
              />
              <svg
                className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CHOOSE YOUR JOURNEY ── */}
      <section className="relative bg-black py-20 md:py-28">
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-heading text-3xl md:text-5xl tracking-wide text-white uppercase mb-6">
              Choose Your Journey
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              TACDEV offers specialized roles built on purpose, discipline, and pride. 
              Explore the options below and find the path that matches your drive to lead, protect, and succeed.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="border border-zinc-800 bg-zinc-950/80 p-8 md:p-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-[1px] bg-[#b91c1c]/60" />
              <h3 className="font-heading text-xl md:text-2xl tracking-wide text-white uppercase">
                High-Priority Roles
              </h3>
              <div className="w-8 h-[1px] bg-[#b91c1c]/60" />
            </div>
            <p className="text-white/45 text-sm text-center mb-10 max-w-2xl mx-auto">
              These positions are currently in highest demand and may accelerate your path into the unit.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {highPriorityRoles.map((role, i) => (
                <motion.div
                  key={role.slug}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                >
                  <Link
                    to={role.href}
                    className="group relative block aspect-[16/10] overflow-hidden border border-zinc-800 hover:border-[#b91c1c]/50 transition-all duration-500 bg-zinc-900"
                  >
                    <motion.img
                      src={role.image}
                      alt={role.label}
                      className="absolute inset-0 w-full h-full object-cover opacity-70"
                      initial={{ scale: 1.05 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: false, amount: 0.4 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      whileHover={{ scale: 1.08, opacity: 0.9 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#b91c1c] transition-all duration-500 group-hover:w-full" />

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h4 className="font-heading text-3xl tracking-wide text-white uppercase">
                        {role.label}
                      </h4>
                      <p className="text-[#b91c1c] text-xs tracking-[0.2em] mt-1.5 uppercase font-medium">
                        {role.nec}
                      </p>
                      <p className="text-white/55 text-xs tracking-wider mt-1 uppercase leading-snug">
                        {role.fullName}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CAREER ASSESSMENT ── */}
      <section className="relative bg-black py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative border border-zinc-800 bg-zinc-950 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-16 h-[2px] bg-[#b91c1c]" />
            <div className="absolute top-0 left-0 w-[2px] h-16 bg-[#b91c1c]" />

            <div className="px-8 py-14 md:px-20 md:py-16 text-center">
              <p className="text-[#b91c1c] text-xs uppercase tracking-[0.3em] font-medium mb-4">
                Not Sure Where to Start?
              </p>
              <h2 className="font-heading text-3xl md:text-4xl tracking-wide text-white uppercase mb-6">
                Career Assessment
              </h2>
              <p className="text-white/55 text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
                Take a short assessment to help identify which special operations role 
                matches your background, skills, and goals.
              </p>
              <Link
                to="/career-assessment"
                className="inline-block bg-white text-black font-semibold tracking-widest uppercase text-sm px-12 py-4 hover:bg-[#b91c1c] hover:text-white transition-all duration-300"
              >
                Launch the Assessment
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ALL CAREERS ── */}
      <section className="relative bg-black pb-28">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl tracking-wide text-white uppercase text-center mb-3">
            All Careers
          </h2>
          <div className="w-10 h-[2px] bg-[#b91c1c] mx-auto mb-12" />

          <div className="border border-zinc-800 bg-zinc-950/60 overflow-hidden">
            <button
              onClick={() => setSpecOpsOpen(!specOpsOpen)}
              className="w-full flex items-center justify-between px-6 md:px-8 py-6 hover:bg-white/[0.03] transition-colors"
            >
              <div className="flex items-center gap-6">
                <div className="w-24 h-16 md:w-28 md:h-20 overflow-hidden flex-shrink-0 border border-zinc-700">
                  <img
                    src="https://i.imgur.com/c4TOmPr.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <h3 className="font-heading text-lg md:text-xl tracking-wide text-white uppercase">
                    Special Operations Careers
                  </h3>
                  <p className="text-white/45 text-sm mt-1 max-w-md">
                    Embark on covert missions, defuse bombs, dive deep in the sea and save lives in spec ops.
                  </p>
                </div>
              </div>
              <svg
                className={`w-5 h-5 text-white/50 transition-transform duration-300 flex-shrink-0 ${specOpsOpen ? "rotate-45" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
            </button>

            <AnimatePresence>
              {specOpsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-zinc-800 px-6 md:px-8 py-10">
                    <h4 className="text-[#b91c1c] text-xs uppercase tracking-[0.25em] mb-2">
                      Available Paths
                    </h4>
                    <p className="text-white/40 text-sm mb-8 max-w-xl">
                      Select a role to view requirements, training pipeline, and expectations.
                    </p>

                    <div className="grid grid-cols-1 gap-y-4 mb-10">
                      {specialOpsRoles.map((role) => (
                        <Link
                          key={role.name}
                          to={role.href}
                          className="group flex items-center gap-3 text-white/75 hover:text-white text-sm md:text-base tracking-wide transition-colors py-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#b91c1c]/70 group-hover:bg-[#b91c1c] transition-colors" />
                          {role.name}
                        </Link>
                      ))}
                    </div>

                    <Link
                      to="/careers/special-operations"
                      className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-white/80 hover:text-[#b91c1c] transition-colors"
                    >
                      View Special Operations Category
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="w-full bg-black border-t border-zinc-800 mt-auto">
        <div className="w-full px-3 sm:px-5 md:px-8 lg:px-10 xl:px-12">

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 py-14 md:py-16">
            
            <div className="flex-shrink-0">
              <img 
                src={FOOTER_LOGO} 
                alt="TACDEV" 
                className="h-16 md:h-20 w-auto object-contain"
              />
            </div>

            <div className="lg:max-w-xl xl:max-w-2xl">
              <h4 className="text-white text-sm uppercase tracking-[0.3em] font-medium mb-4 text-left">
                MISSION
              </h4>
              <p className="text-white/70 text-sm md:text-base leading-relaxed text-left">
                The United States is a maritime nation, and the U.S. Navy protects America at sea. Alongside our allies and partners, we defend freedom, preserve economic prosperity and keep the seas open and free.
              </p>
            </div>
          </div>

          <div className="border-t border-zinc-700" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 py-12 md:py-14">
            
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

            <div className="hidden md:block md:col-span-1" />

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

            <div className="hidden md:block md:col-span-1" />

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
};

export default Careers;