import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const DISCORD = "https://discord.gg/8HpRpHsHVT";
const FOOTER_LOGO = "https://i.ibb.co/DP0007hy/footer-logo-1.png";
const NAVBAR_COIN = "https://i.imgur.com/xEtxsCw.png";

const NavyCorpsman = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-black text-white font-['Barlow',sans-serif]">
      
      {/* ── HERO ── */}
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(https://i.imgur.com/4H14H0j.jpg)` }}
          initial={{ y: 0 }}
          whileInView={{ y: -40 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-white/70 text-xs md:text-sm tracking-[0.35em] uppercase mb-5 font-medium"
          >
            ENLISTED
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-none uppercase"
          >
            HOSPITAL CORPSMAN ADVANCED TECHNICAL FIELD<br />
            ADVANCED TECHNICAL FIELD<br />
          </motion.h1>
        </div>
      </section>

      {/* ── OVERVIEW SECTION ── */}
      <section className="bg-black text-white py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-semibold tracking-tight uppercase mb-8"
          >
            ADVANCED TECHNICAL FIELD
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg leading-relaxed text-white/55"
          >
            Special Operations Independent Duty Corpsmen provide specialized medical support to Naval Special Warfare. 
            They deliver advanced trauma care, combat medicine, and technical medical skills in austere and high-threat environments, 
            often operating as the sole medical provider for special operations teams.
          </motion.p>
        </div>
      </section>

      {/* ── DROPDOWNS SECTION ── */}
      <section className="bg-black py-16 md:py-20 px-6">
        <div className="max-w-3xl mx-auto">
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm md:text-base tracking-[0.2em] uppercase mb-8 text-white/50 font-medium"
          >
            Career Details & Requirements
          </motion.h2>

          {/* Responsibilities */}
          <div className="border border-white/10 mb-3 overflow-hidden">
            <button
              onClick={() => toggleSection("responsibilities")}
              className="w-full flex items-center justify-between px-5 py-4 bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
            >
              <span className="font-medium tracking-widest uppercase text-xs text-white/90">
                Responsibilities
              </span>
              <ChevronDown
                className={`w-4 h-4 text-white/40 transition-transform duration-300 ${
                  openSection === "responsibilities" ? "rotate-180" : ""
                }`}
              />
            </button>
            
            <AnimatePresence>
              {openSection === "responsibilities" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 py-5 text-white/55 text-sm leading-relaxed border-t border-white/10 bg-white/[0.02]">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Provide advanced trauma care and emergency medical treatment in combat and austere environments</li>
                      <li>Serve as the primary medical provider for Naval Special Warfare teams</li>
                      <li>Perform advanced clinical procedures and technical medical skills</li>
                      <li>Support special operations missions with prolonged field care capability</li>
                      <li>Train team members in basic and advanced medical skills</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Requirements */}
          <div className="border border-white/10 mb-3 overflow-hidden">
            <button
              onClick={() => toggleSection("requirements")}
              className="w-full flex items-center justify-between px-5 py-4 bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
            >
              <span className="font-medium tracking-widest uppercase text-xs text-white/90">
                Requirements
              </span>
              <ChevronDown
                className={`w-4 h-4 text-white/40 transition-transform duration-300 ${
                  openSection === "requirements" ? "rotate-180" : ""
                }`}
              />
            </button>
            
            <AnimatePresence>
              {openSection === "requirements" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 py-5 text-white/55 text-sm leading-relaxed border-t border-white/10 bg-white/[0.02]">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Must be a U.S. citizen</li>
                      <li>Must meet age and physical requirements for special operations medical pipelines</li>
                      <li>Must pass the required Physical Screening Test</li>
                      <li>Must be eligible for a secret security clearance</li>
                      <li>Must complete Hospital Corpsman training and Advanced Technical Field pipeline</li>
                      <li>Must complete additional special operations medical training</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Capabilities & Operational Environment */}
          <div className="border border-white/10 mb-3 overflow-hidden">
            <button
              onClick={() => toggleSection("capabilities")}
              className="w-full flex items-center justify-between px-5 py-4 bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
            >
              <span className="font-medium tracking-widest uppercase text-xs text-white/90">
                Capabilities & Operational Environment
              </span>
              <ChevronDown
                className={`w-4 h-4 text-white/40 transition-transform duration-300 ${
                  openSection === "capabilities" ? "rotate-180" : ""
                }`}
              />
            </button>
            
            <AnimatePresence>
              {openSection === "capabilities" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 py-5 text-white/55 text-sm leading-relaxed border-t border-white/10 bg-white/[0.02]">
                    <p className="mb-4">
                      Special Operations Independent Duty Corpsmen operate alongside Naval Special Warfare teams in every environment — maritime, desert, jungle, arctic, and urban.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Advanced trauma and combat casualty care</li>
                      <li>Prolonged field care in austere conditions</li>
                      <li>Special operations medical support</li>
                      <li>Dive and parachute medical capability</li>
                      <li>Independent medical decision-making under pressure</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

{/* Back link */}
<div className="bg-black pb-16 text-center">
  <Link
    to="/careers/special-operations"
    className="inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors text-xs tracking-widest uppercase font-medium"
  >
    ← BACK TO SPECIAL OPERATIONS CAREERS
  </Link>
</div>

      {/* ── CONTACT SECTION ── */}
      <section className="relative bg-black py-20 md:py-24 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-2xl md:text-3xl font-semibold tracking-tight text-white uppercase mb-4"
          >
            Contact Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/45 text-sm mb-12"
          >
            Have a question or just want to learn more? We’re here to help.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <Link
                to="/inquiries"
                className="group flex flex-col items-center justify-center aspect-square border border-white/15 hover:border-white/40 bg-white/[0.02] transition-all duration-300 p-8"
              >
                <svg
                  className="w-7 h-7 text-white/50 group-hover:text-white transition-colors mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-xs tracking-[0.2em] text-white/80 uppercase font-medium">
                  Contact Us
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <Link
                to="/inquiries"
                className="group flex flex-col items-center justify-center aspect-square border border-white/15 hover:border-white/40 bg-white/[0.02] transition-all duration-300 p-8"
              >
                <svg
                  className="w-7 h-7 text-white/50 group-hover:text-white transition-colors mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-xs tracking-[0.2em] text-white/80 uppercase font-medium">
                  Inquiries
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="w-full bg-black border-t border-white/10 mt-auto font-['Barlow',sans-serif]">
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
              <h4 className="text-white text-xs uppercase tracking-[0.3em] font-semibold mb-4 text-left">
                MISSION
              </h4>
              <p className="text-white/65 text-sm md:text-[15px] leading-relaxed text-left">
                The United States is a maritime nation, and the U.S. Navy protects America at sea. Alongside our allies and partners, we defend freedom, preserve economic prosperity and keep the seas open and free.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 py-12 md:py-14 items-start">
            
            <div className="md:col-span-2 flex items-start">
              <img
                src={NAVBAR_COIN}
                alt="TACDEV"
                className="h-28 md:h-32 w-auto object-contain opacity-90"
              />
            </div>

            <div className="md:col-span-2 md:col-start-4">
              <h4 className="text-[#b91c1c] text-xs uppercase tracking-[0.25em] font-semibold mb-5">
                Recruitment
              </h4>
              <div className="space-y-3">
                <Link to="/requirements" className="block text-sm tracking-[0.15em] text-white/70 hover:text-white transition-colors">
                  Requirements
                </Link>
                <Link to="/apply" className="block text-sm tracking-[0.15em] text-white/70 hover:text-white transition-colors">
                  Apply Now
                </Link>
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-[#b91c1c] text-xs uppercase tracking-[0.25em] font-semibold mb-5">
                Get in Touch
              </h4>
              <div className="space-y-3">
                <Link to="/faq" className="block text-sm tracking-[0.15em] text-white/70 hover:text-white transition-colors">
                  FAQs
                </Link>
                <Link to="/career-assessment" className="block text-sm tracking-[0.15em] text-white/70 hover:text-white transition-colors">
                  Career Assessment
                </Link>
                <Link to="/inquiries" className="block text-sm tracking-[0.15em] text-white/70 hover:text-white transition-colors">
                  Contact
                </Link>
              </div>
            </div>

            <div className="md:col-span-3 md:col-start-10">
              <h4 className="text-white text-xs uppercase tracking-[0.3em] font-semibold mb-1">
                Connect
              </h4>
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-6">
                Get Social With Us
              </p>
              
              <div className="flex items-center gap-5">
                <a 
                  href="https://www.instagram.com/development_evaluations.4/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors" 
                  aria-label="Instagram"
                >
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
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.874.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <p className="text-white/35 text-xs tracking-[0.15em]">
                © 2026 TACDEV
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

export default NavyCorpsman;