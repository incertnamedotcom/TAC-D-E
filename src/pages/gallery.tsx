import { motion } from "motion/react";
import { useEffect } from "react";

const Gallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const albums = [
    {
      date: "JULY 18, 2026",
      title: "TALISMAN SABRE 26",
      location: "OCONUS",
      image: "https://i.imgur.com/c4TOmPr.jpg",
    },
    {
      date: "JUNE 14, 2026",
      title: "NAVAL SPECIAL WARFARE JOINT TRAINING",
      location: "CONUS",
      image: "https://i.imgur.com/FxzKjTt.png",
    },
    {
      date: "JUNE 3, 2026",
      title: "NIGHT OPERATIONS - GREEN GRID",
      location: "CONUS",
      image: "https://i.imgur.com/Uq1iVWx.jpg",
    },
    {
      date: "MAY 22, 2026",
      title: "HELICOPTER INSERTION TRAINING",
      location: "CONUS",
      image: "https://i.imgur.com/4H14H0j.jpg",
    },
    {
      date: "APRIL 19, 2026",
      title: "BALIKATAN 2026",
      location: "OCONUS",
      image: "https://i.imgur.com/RP1Uzwl.png",
    },
    {
      date: "MAR 02 - MAR 08, 2026",
      title: "TACTICAL COMBAT CASUALTY CARE",
      location: "OCONUS",
      image: "https://i.imgur.com/AtWnhpx.png",
    },
    {
      date: "FEB 17, 2026",
      title: "AQUARIUS DIVE TRAINING",
      location: "CONUS",
      image: "https://i.imgur.com/MWogjdZ.png",
    },
    {
      date: "JAN 28, 2026",
      title: "NIGHTTIME OPERATOR TRAINING",
      location: "CONUS",
      image: "https://i.imgur.com/xwc4W7E.png",
    },
  ];

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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[#b91c1c] text-sm uppercase tracking-[0.25em] mb-4 font-medium"
          >
            PHOTO ALBUMS
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="font-heading text-6xl md:text-8xl lg:text-9xl tracking-wide text-white leading-none"
          >
            2026
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-14 h-[2px] bg-[#b91c1c] mx-auto mt-8"
          />
        </div>
      </section>

      {/* ── PHOTO GRID ── */}
      <section className="relative z-10 pt-24 pb-40 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-10 gap-y-16">
            {albums.map((album, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: index * 0.07 }}
                className="group cursor-pointer"
              >
                <p className="text-[12px] tracking-[0.2em] text-white/45 uppercase mb-4 font-medium">
                  {album.date}
                </p>

                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                  <img
                    src={album.image}
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-[15px] font-medium tracking-wide leading-snug uppercase">
                      {album.title}
                    </h3>
                    <p className="text-white/50 text-[11px] tracking-[0.15em] mt-2 uppercase">
                      {album.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;