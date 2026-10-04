import { motion } from "motion/react";

const Gallery = () => {
  const galleryImages = [
    "https://i.imgur.com/c4TOmPr.jpg",
    "https://i.imgur.com/FxzKjTt.png",
    "https://i.imgur.com/Uq1iVWx.jpg",
    "https://i.imgur.com/4H14H0j.jpg",
    "https://i.imgur.com/RP1Uzwl.png",
    "https://i.imgur.com/AtWnhpx.png",
    "https://i.imgur.com/MWogjdZ.png",
    "https://i.imgur.com/xwc4W7E.png",
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-32 pb-32 px-6">   {/* pt-32 */}
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <p className="text-red-600 text-sm uppercase tracking-[0.125em] mb-3">
            TACDEV MEDIA
          </p>
          <h1 className="font-serif text-6xl md:text-7xl font-black tracking-widest text-white uppercase">
            GALLERY
          </h1>
          <div className="w-12 h-px bg-red-600 mx-auto mt-8" />
        </motion.div>

        {/* Spacious Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl aspect-[16/11] bg-zinc-900 shadow-2xl shadow-black/50"
            >
              <img 
                src={image} 
                alt={`TACDEV Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Gallery;