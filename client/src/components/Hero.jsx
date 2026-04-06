import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

export default function Hero({ onSearch, loading }) {
  return (
    <section
      id="search"
      className="relative pt-12 md:pt-10 pb-12 md:pb-16 text-center pointer-events-none px-4 min-h-[66vh] flex flex-col justify-center "
    >
      {/* --- RANDOM BACKGROUND BADGES --- */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[5%] md:left-[15%] px-3 py-1 rounded-full border border-black/10 bg-white/5 backdrop-blur-sm text-[8px] font-mono text-gray-500 uppercase tracking-widest hidden sm:inline-flex items-center gap-2"
      >
        <div className="w-1 h-1 rounded-full bg-indigo-500/40" />
        Tracking_Active
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-[20%] right-[25%] md:right-[10%] px-3 py-1 rounded-full border border-black/10 bg-white/5 backdrop-blur-sm text-[8px] font-mono text-gray-500 uppercase tracking-widest hidden sm:inline-flex items-center gap-2"
      >
        <div className="w-1 h-1 rounded-full bg-emerald-500/40" />
        Real_time_Updates
      </motion.div>

      <motion.div
        animate={{ x: [0, 10, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute bottom-[35%] left-[5%] px-3 py-1 rounded-full border border-black/10 bg-white/5 backdrop-blur-sm text-[8px] font-mono text-gray-500 uppercase tracking-widest hidden md:inline-flex items-center gap-2"
      >
        <div className="w-1 h-1 rounded-full bg-amber-500/40" />
        Amazon_India
      </motion.div>

      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[7%] right-[7%] px-3 py-1 rounded-full border border-black/10 bg-white/5 backdrop-blur-sm text-[8px] font-mono text-gray-500 uppercase tracking-widest hidden md:inline-flex items-center gap-2"
      >
        <div className="w-1 h-1 rounded-full bg-blue-500/40" />
        Flipkart_Live
      </motion.div>


      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Badge */}
        {/* <div className="inline-flex items-center gap-2 mb-6 md:mb-8 px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-gray-100 border border-[#C2F84F] backdrop-blur-md text-[9px] md:text-[10px] font-mono uppercase tracking-[0.15em] md:tracking-[0.2em] text-black">
          <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-emerald-500"></span>
          </span>
          Live Sync <span className=" px-0.5 md:px-1">•</span> Amazon & Flipkart
        </div> */}

        <p className=" mt-40 font-body max-w-[280px] sm:max-w-md md:max-w-lg mx-auto mb-8 md:mb-12 text-sm md:text-lg leading-relaxed text-gray-500">
          The intelligent shopping radar that monitors India's top marketplaces
          so you don't have to.{" "}
          <span className="hidden sm:inline">Comparison, simplified.</span>
        </p>
      </motion.div>

      <div className="relative z-10 pointer-events-auto w-full max-w-2xl mx-auto">
        <SearchBar onSearch={onSearch} loading={loading} />
      </div>
    </section>
  );
}
