import { motion } from "motion/react";
import { useEffect } from "react";

const Videos = () => {
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
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(https://i.imgur.com/DCjut3E.jpeg)` }}
        />
        <div className="absolute inset-0 bg-black/70" />
        
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="font-heading text-6xl md:text-8xl tracking-wide text-white leading-none"
          >
            VIDEOS
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-14 h-[2px] bg-[#b91c1c] mx-auto mt-8"
          />
        </div>
      </section>

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-28 pt-20">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border border-zinc-800 bg-zinc-900/40 overflow-hidden"
        >
          {/* Video */}
          <div className="aspect-video bg-black">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/3jNtxCj71O8"
              title="Runs"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* Caption */}
          <div className="px-8 py-7 border-t border-zinc-800">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-8 h-[2px] bg-[#b91c1c]" />
              <p className="text-[#b91c1c] text-xs uppercase tracking-[0.2em] font-medium">
                Featured
              </p>
            </div>
            <h3 className="font-heading text-2xl md:text-3xl tracking-wide text-white">
              Runs
            </h3>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-white/30 text-sm tracking-widest uppercase mt-16"
        >
          More content coming soon
        </motion.p>
      </div>
    </div>
  );
};

export default Videos;