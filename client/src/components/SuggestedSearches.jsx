import { motion } from "framer-motion";

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
      className="flex flex-col items-center gap-6 "
    >
      {/* HUD Header */}
      <div className="flex items-center gap-4 opacity-50">
        <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-black/20" />
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-black">
          Frequent Targets
        </span>
        <div className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-black/20" />
      </div>

      {/* Suggestion Chips */}
      <div className="flex flex-wrap justify-center gap-3 max-w-xl mx-auto px-4">
        {SUGGESTIONS.map((term, i) => (
          <motion.button
            key={term}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 + (i * 0.05) }}
            onClick={() => onSelect(term)}
            /* ADDED: cursor-target class for the TargetCursor to snap to */
            className="cursor-target group flex items-center gap-2 px-5 py-2 rounded-full border border-black/5 bg-black/[0.03] backdrop-blur-xl text-[12px] font-mono text-black/70 hover:text-black hover:border-black/30 hover:bg-black/10 transition-all duration-300"
          >
            {/* Tiny Indicator Dot */}
            <div className="w-1 h-1 rounded-full bg-black/20 group-hover:bg-[#C2F84F] transition-colors" />
            {term}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}