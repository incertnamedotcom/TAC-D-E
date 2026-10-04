import { motion } from "motion/react";

const About = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white relative overflow-hidden">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://i.imgur.com/c4TOmPr.jpg')",
          filter: "brightness(0.65) contrast(1.1)"
        }}
      />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/90" />

      <div className="relative z-10 pt-32 pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <p className="text-red-600 text-sm uppercase tracking-[0.125em] mb-3">
              TACDEV
            </p>
            <h1 className="font-serif text-6xl md:text-7xl font-black tracking-widest text-white uppercase">
              ABOUT US
            </h1>
            <div className="w-12 h-px bg-red-600 mx-auto mt-8" />
          </motion.div>

          {/* Main Content */}
          <div className="prose prose-invert max-w-none text-lg leading-relaxed text-zinc-200">
            <p className="text-xl font-light mb-10">
              Tactical Development &amp; Evaluations Group (TACD&amp;E) is a premier Arma 3 milsim organization modeled after real-world Naval Special Warfare development elements. Established to replicate the standards and operational mindset of top-tier special mission units, we operate within a structured NSW-style framework focused on precision, discipline, and realism.
            </p>

            <p className="mb-8">
              Our core mission is the development, testing, and refinement of advanced tactics, techniques, and procedures (TTPs). We emphasize analytical thinking, adaptability, and high-level execution across complex operational environments. Every scenario we run is designed not just to simulate combat, but to evaluate and evolve how it is conducted.
            </p>

            <p className="mb-8">
              TACD&amp;E specializes in high-end special operations, including direct action, reconnaissance, and mission-focused tasking that demands coordination, communication, and technical proficiency. Members are expected to operate at a professional standard, contributing to both individual performance and organizational advancement.
            </p>

            <p>
              We are not just a unit—we are a development-driven organization committed to continuous improvement, realism, and excellence in every operation.
            </p>
          </div>

          {/* Closing Statement */}
          <div className="mt-24 pt-12 border-t border-red-900/30 text-center">
            <p className="text-red-600 text-sm uppercase tracking-[0.2em]">
              PRECISION • DISCIPLINE • EXCELLENCE
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;