import { useState } from "react";
import { Search, X, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !loading) onSearch(query.trim());
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full max-w-2xl mx-auto px-4 sm:px-0"
    >
      <div 
        className={`relative flex items-center transition-all duration-500 rounded-2xl border backdrop-blur-md
          ${isFocused 
            ? " md:scale-[1.01]" 
            : "bg-[#0f0f1a]/40 border-white/10 shadow-xl"
          }`}
      >
        {/* Search Icon - Hidden on very small screens to save space */}
        <div className="hidden xs:block pl-4 md:pl-5">
          {loading ? (
            <Loader2 size={18} className="text-[#FF9900] animate-spin" />
          ) : (
            <Search
              size={18}
              className={`transition-colors duration-300 ${isFocused ? "text-[#FF9900]" : "text-[#6b6b8a]"}`}
            />
          )}
        </div>

        <input
          type="text"
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isFocused ? "" : "Search products..."}
          disabled={loading}
          className="flex-1 bg-transparent py-4 md:py-5 pl-4 md:pl-4 pr-2 text-[#e8e8f0] placeholder:text-gray-500 font-body text-sm md:text-base outline-none disabled:opacity-50"
        />

        {/* Clear Button */}
        <AnimatePresence>
          {query && !loading && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              type="button"
              onClick={() => setQuery("")}
              className="p-2 text-[#3a3a55] hover:text-white transition-colors mr-1"
            >
              <X size={16} md:size={18} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Action Button - Shrinks on Mobile */}
        <button
  type="submit"
  disabled={!query.trim() || loading}
  className={`group relative m-1.5 md:m-2 px-4 md:px-6 py-2.5 rounded-xl font-bold text-xs md:text-sm overflow-hidden transition-all active:scale-95
    ${loading 
      ? "bg-[#1e1e2e] text-white/50 cursor-not-allowed" 
      // FIX: Changed bg-gray-500 to the brand gradient
      : "bg-gradient-to-r from-[#FF9900] to-[#FFB84D] text-black shadow-lg shadow-[#FF9900]/10 hover:shadow-[#FF9900]/20"
    }`}
>
  <span className="relative z-10 flex items-center gap-2">
    {loading ? (
      <Loader2 size={16} className="animate-spin md:hidden" />
    ) : null}
    <span className={loading ? "hidden md:inline" : "inline"}>
      {loading ? "Searching..." : "Compare"}
    </span>
    {!loading && <ArrowRight size={14} className="md:hidden" />}
  </span>
  
  {/* Hover overlay - Subtle brightening effect */}
  {!loading && (
    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
  )}
</button>
      </div>

      {/* Meta Info - Responsive scaling */}
      <div className="mt-4 flex items-center justify-center gap-4 md:gap-6 opacity-60">
        <p className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.1em] md:tracking-[0.2em] text-black bg-white px-3 py-1 rounded-full">
          Amazon.in <span className="text-black/20 px-1 md:px-2">|</span> Flipkart.com
        </p>
      </div>
    </motion.form>
  );
}