import { motion } from "motion/react";

const Videos = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-32 pb-20 px-6">   {/* pt-32 */}
      <div className="max-w-5xl mx-auto">
        
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
            VIDEOS
          </h1>
          <div className="w-12 h-px bg-red-600 mx-auto mt-8" />
        </motion.div>

        {/* Video */}
        <div className="max-w-4xl mx-auto bg-zinc-900 border border-red-900/30 rounded-2xl overflow-hidden">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/3jNtxCj71O8"
              title="TACDEV - Runs"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="p-8">
            <h3 className="text-2xl font-semibold text-white">
              TACDEV - Runs
            </h3>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Videos;