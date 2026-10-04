import { Link } from "react-router-dom";
import { motion } from "motion/react";

const AirForceCareers = () => {
  const options = [
    {
      title: "COMBAT CONTROLLER\nSPECIALIST",
      image: "https://i.imgur.com/MWogjdZ.png",
      description:
        "Special operations forces trained to operate in austere environments. They provide air traffic control, fire support, and terminal attack control in combat zones.",
      href: "/careers/airforce/cct",
    },
    {
      title: "PARARESCUE\n(PJ) SPECIALIST",
      image: "https://i.imgur.com/MWogjdZ.png",
      description:
        "Elite combat rescue specialists. Recover and provide medical treatment to personnel in hostile or denied areas. The most highly trained emergency trauma specialists in the U.S. military.",
      href: "/careers/airforce/pj",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <p className="text-red-500 text-sm uppercase tracking-[0.25em] mb-4 font-medium">
            UNITED STATES AIR FORCE
          </p>
          <h1 className="font-heading text-5xl md:text-7xl tracking-wide text-white">
            U.S. AIR FORCE
          </h1>
          <div className="w-14 h-[2px] bg-red-600 mx-auto mt-8" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              <Link
                to={option.href}
                className="group relative block h-[560px] md:h-[640px] overflow-hidden cursor-pointer"
              >
                <img
                  src={option.image}
                  alt={option.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                  <h3 className="font-heading text-3xl md:text-4xl tracking-wide uppercase leading-none mb-5 whitespace-pre-line">
                    {option.title}
                  </h3>
                  <p className="text-white/75 text-base leading-relaxed">
                    {option.description}
                  </p>

                  <div className="mt-8 w-12 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-20" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Apply CTA + Back */}
        <div className="mt-20 text-center space-y-6">
          <Link
            to="/apply?branch=airforce"
            className="inline-block border-2 border-white text-white font-semibold tracking-widest uppercase text-sm px-14 py-5 hover:bg-white hover:text-black transition-all duration-300"
          >
            APPLY FOR AIR FORCE
          </Link>

          <div>
            <Link
              to="/careers"
              className="inline-flex items-center gap-3 text-red-500 hover:text-red-400 transition-colors text-sm tracking-widest uppercase font-medium"
            >
              ← BACK TO CAREERS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirForceCareers;