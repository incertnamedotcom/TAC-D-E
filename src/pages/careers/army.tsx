import { Link } from "react-router-dom";
import { motion } from "motion/react";

const ArmyCareers = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <p className="text-red-600 text-sm uppercase tracking-[0.125em] mb-3">
            UNITED STATES ARMY
          </p>
          <h1 className="font-serif text-6xl md:text-7xl font-black tracking-widest text-white uppercase">
            ARMY CAREER PATHS
          </h1>
          <div className="w-12 h-px bg-red-600 mx-auto mt-8" />
        </motion.div>

        {/* Special Aviator Card */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/careers/army/special-aviator"
              className="group relative block h-[620px] md:h-[720px] lg:h-[820px] xl:h-[900px] overflow-hidden rounded-3xl cursor-pointer shadow-2xl shadow-black/90"
            >
              <img
                src="https://i.imgur.com/xwc4W7E.png"
                alt="Special Aviator"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-14 lg:p-20">
                <h3 className="font-serif text-5xl md:text-6xl font-black tracking-widest uppercase leading-none mb-8">
                  SPECIAL AVIATOR
                </h3>
                <p className="text-zinc-300 text-lg md:text-xl leading-relaxed max-w-lg">
                  Elite rotary-wing aviators supporting special operations
                  forces. Highly skilled pilots trained for combat assault,
                  reconnaissance, and high-risk missions in support of Army
                  Special Operations.
                </p>

                <div className="mt-10 w-14 h-px bg-red-600 transition-all duration-300 group-hover:w-24" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Apply CTA + Back */}
        <div className="mt-24 text-center space-y-6">
          <Link
            to="/apply?branch=army"
            className="inline-block border-2 border-white text-white font-semibold tracking-widest uppercase text-sm px-14 py-5 hover:bg-white hover:text-black transition-all duration-300"
          >
            APPLY FOR ARMY
          </Link>

          <div>
            <Link
              to="/careers"
              className="inline-flex items-center gap-3 text-red-500 hover:text-red-400 transition-colors text-sm tracking-widest uppercase font-medium"
            >
              ← BACK TO ALL CAREER PATHS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArmyCareers;