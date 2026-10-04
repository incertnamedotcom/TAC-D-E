import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const NavyEod = () => {
  const [openSection, setOpenSection] = useState<string | null>("responsibilities");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      
      {/* ── HERO ── */}
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden">
        <img
          src="https://i.imgur.com/RP1Uzwl.png"
          alt="Explosive Ordnance Disposal"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-white/90 text-sm md:text-base tracking-[0.4em] uppercase mb-5 font-medium"
          >
            ENLISTED
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide text-white leading-none"
          >
            EXPLOSIVE ORDNANCE<br />DISPOSAL
          </motion.h1>
        </div>
      </section>

      {/* ── OVERVIEW SECTION ── */}
      <section className="bg-zinc-950 text-white py-24 px-6 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl tracking-wide uppercase mb-8"
          >
            RENDER SAFE
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl leading-relaxed text-zinc-400 mb-12"
          >
            Navy EOD technicians are elite specialists who locate, identify, and safely dispose of explosive threats. 
            They support special operations forces, naval vessels, and joint missions by neutralizing conventional ordnance, 
            improvised explosive devices, and underwater mines in the most hostile environments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/apply"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-12 py-4 text-sm font-semibold tracking-widest uppercase transition-all duration-300"
            >
              APPLY NOW
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── DROPDOWNS SECTION ── */}
      <section className="bg-zinc-950 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl tracking-wide uppercase mb-10 text-center"
          >
            CAREER DETAILS & REQUIREMENTS
          </motion.h2>

          {/* Responsibilities */}
          <div className="border border-zinc-800 mb-4">
            <button
              onClick={() => toggleSection("responsibilities")}
              className="w-full flex items-center justify-between px-6 py-5 bg-zinc-900 hover:bg-zinc-800 transition-colors"
            >
              <span className="font-semibold tracking-widest uppercase text-sm">
                Responsibilities
              </span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
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
                  <div className="px-6 py-6 text-zinc-300 leading-relaxed border-t border-zinc-800">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Locate, identify, and render safe explosive hazards including IEDs, unexploded ordnance, and underwater mines</li>
                      <li>Support special operations forces with advanced demolition and technical expertise</li>
                      <li>Conduct underwater mine countermeasures and explosive ordnance disposal operations</li>
                      <li>Provide force protection for ships, bases, and forward operating locations</li>
                      <li>Train and advise partner forces on explosive threat mitigation</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Requirements */}
          <div className="border border-zinc-800 mb-4">
            <button
              onClick={() => toggleSection("requirements")}
              className="w-full flex items-center justify-between px-6 py-5 bg-zinc-900 hover:bg-zinc-800 transition-colors"
            >
              <span className="font-semibold tracking-widest uppercase text-sm">
                Requirements
              </span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
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
                  <div className="px-6 py-6 text-zinc-300 leading-relaxed border-t border-zinc-800">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Must be a U.S. citizen</li>
                      <li>Must be 30 years of age or younger</li>
                      <li>Must meet minimum ASVAB score requirements</li>
                      <li>Must pass the EOD Physical Screening Test</li>
                      <li>Must be eligible for a secret security clearance</li>
                      <li>Must complete EOD training pipeline (including dive and parachute training)</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Capabilities & Operational Environment */}
          <div className="border border-zinc-800 mb-4">
            <button
              onClick={() => toggleSection("capabilities")}
              className="w-full flex items-center justify-between px-6 py-5 bg-zinc-900 hover:bg-zinc-800 transition-colors"
            >
              <span className="font-semibold tracking-widest uppercase text-sm">
                Capabilities & Operational Environment
              </span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
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
                  <div className="px-6 py-6 text-zinc-300 leading-relaxed border-t border-zinc-800">
                    <p className="mb-4">
                      Navy EOD technicians operate in every environment — from shipboard and port facilities to combat zones, underwater, and austere forward locations.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Conventional and improvised explosive device disposal</li>
                      <li>Underwater mine countermeasures and diving operations</li>
                      <li>Support to Naval Special Warfare and joint special operations</li>
                      <li>Weapons of mass destruction response</li>
                      <li>High-risk boarding and maritime interdiction support</li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Back link */}
      <div className="bg-zinc-950 pb-16 text-center">
        <Link
          to="/careers/navy"
          className="inline-flex items-center gap-3 text-red-500 hover:text-red-400 transition-colors text-sm tracking-widest uppercase font-medium"
        >
          ← BACK TO NAVY CAREERS
        </Link>
      </div>
    </div>
  );
};

export default NavyEod;