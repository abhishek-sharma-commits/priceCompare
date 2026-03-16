import { motion } from "framer-motion";
import { Hash } from "lucide-react";

const SUGGESTIONS = [
  "iPhone 15", "Samsung S24", "Sony XM5", 
  "MacBook M3", "Boat Rockerz", "Xiaomi 14"
];

export default function SuggestedSearches({ onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="flex flex-col items-center "
    >
      {/* HUD Header */}
      <div className="flex items-center gap-4">
        <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-white/10" />
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#3a3a55]">
          Frequent Targets
        </span>
        <div className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-white/10" />
      </div>

      {/* Suggestion Chips */}
      <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto px-4">
        {SUGGESTIONS.map((term, i) => (
          <motion.button
            key={term}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 + (i * 0.05) }}
            onClick={() => onSelect(term)}
            className="group flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-sm text-[11px] font-mono text-white hover:text-white hover:border-[#FF9900]/30 hover:bg-[#FF9900]/5 transition-all duration-300"
          >
            {/* Tiny Indicator Dot */}
            <div className="w-1 h-1 rounded-full bg-[#3a3a55] group-hover:bg-[#FF9900] group-hover:pulse-dot transition-colors" />
            {term}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}