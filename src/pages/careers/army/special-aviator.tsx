import { Link } from "react-router-dom";
import { motion } from "motion/react";

const ArmySpecialAviator = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://i.imgur.com/xwc4W7E.png')",
          filter: "brightness(0.6) contrast(1.1)"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black" />

      <div className="relative z-10 pt-32 pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <p className="text-red-600 text-sm uppercase tracking-widest mb-3">UNITED STATES ARMY</p>
            <h1 className="font-serif text-6xl md:text-7xl font-black tracking-widest uppercase">SPECIAL AVIATOR</h1>
          </motion.div>

          <div className="prose prose-invert max-w-none text-lg leading-relaxed text-zinc-200">
            <p className="text-xl">Special Aviators are elite helicopter pilots assigned to the 160th Special Operations Aviation Regiment (SOAR) — the Night Stalkers.</p>
            <p>They fly highly modified aircraft in support of special operations forces under the most extreme conditions, often at night and in hostile territory.</p>
          </div>

          <div className="mt-20 text-center">
            <Link to="/careers/army" className="inline-flex items-center gap-3 text-red-500 hover:text-red-400 text-sm tracking-widest uppercase">
              ← BACK TO ARMY CAREER PATHS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArmySpecialAviator;