import { motion } from "motion/react";
import { useEffect } from "react";

export default function Standards() {
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
      <section className="relative h-[100svh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(https://i.imgur.com/DCjut3E.jpeg)` }}
        />
        <div className="absolute inset-0 bg-black/65" />
        
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="font-heading text-6xl md:text-8xl lg:text-9xl tracking-wide text-white leading-none"
          >
            OUR STANDARDS
          </motion.h1>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-28 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[#b91c1c] text-sm uppercase tracking-[0.25em] mb-4 font-medium">
            How We Operate
          </p>
          
          <h2 className="font-heading text-4xl md:text-5xl tracking-wide text-white mb-6">
            OUR STANDARDS
          </h2>
          
          <div className="w-14 h-[2px] bg-[#b91c1c] mb-10" />

          <div className="space-y-6 text-white/70 text-base md:text-lg leading-relaxed max-w-3xl">
            <p>
              The standard is deliberate. Training is realistic. The work is not for everyone.
            </p>
            <p>
              We maintain the highest levels of professionalism, discipline, and accountability. Every operator is expected to uphold the unit’s reputation through consistent performance, integrity, and mutual trust.
            </p>
            <p>
              There are no shortcuts. Excellence is the minimum requirement.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}