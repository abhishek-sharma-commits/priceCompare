import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

export default function Hero({ onSearch, loading }) {
  return (
    
    <section id="search" className="relative pt-12 md:pt-10 pb-12 md:pb-16 text-center pointer-events-none px-4">
      
      {/* Responsive Glow  mobile */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-[#FF9900]/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Badge  */}
        <div className="inline-flex items-center  gap-2 mb-6 md:mb-8 px-3 py-1.5 md:px-4 md:py-2 rounded-xl bg-gray-100 border border-white/10 backdrop-blur-md text-[9px] md:text-[10px] font-mono uppercase tracking-[0.15em] md:tracking-[0.2em]">
          <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-emerald-500"></span>
          </span>
          Live Sync <span className=" px-0.5 md:px-1">•</span> Amazon & Flipkart
        </div>

        {/* Responsive Heading - Scaled from text-4xl (mobile) to text-7xl (desktop) */}
        {/* <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tighter mb-4 md:mb-6">
          Find the best{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-[#FF9900] via-[#FFB84D] to-[#2874F0] text-transparent bg-clip-text">
              price.
            </span>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -bottom-1 md:-bottom-2 left-0 h-[1.5px] md:h-[2px] bg-gradient-to-r from-[#FF9900] to-transparent opacity-50"
            />
          </span>
          <br />
          <span className="opacity-90">Every time.</span>
        </h1> */}

        <p className=" mt-20 font-body max-w-[280px] sm:max-w-md md:max-w-lg mx-auto mb-8 md:mb-12 text-sm md:text-lg leading-relaxed">
          The intelligent shopping radar that monitors India's top marketplaces 
          so you don't have to. <span className="hidden sm:inline">Comparison, simplified.</span>
        </p>
      </motion.div>

      <div className="relative z-10 pointer-events-auto w-full max-w-2xl mx-auto">
        <SearchBar onSearch={onSearch} loading={loading} />
      </div>
    </section>
  );
}