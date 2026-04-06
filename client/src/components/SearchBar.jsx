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
          ${
            isFocused
              ? " md:scale-[1.01]"
              : "bg-black/10 border-black/10 shadow-xl"
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
          className="flex-1 bg-transparent py-4 md:py-5 pl-4 md:pl-4 pr-2 text-[#000] placeholder:text-gray-500 font-body text-sm md:text-base outline-none disabled:opacity-50"
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
    ${
      loading
        ? "bg-[#1e1e2e] text-white/50 cursor-not-allowed"
        : "group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:border-rose-300 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 underline underline-offset-2 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:underline hover:underline-offset-4  origin-left hover:decoration-2 hover:text-rose-300 relative bg-neutral-800 h-12 w-48 border text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg"
    }`}
        >
          <span className="relative z-10 flex items-center gap-2">
            {loading ? (
              <Loader2 size={16} className="animate-spin md:hidden" />
            ) : null}
            <span className={loading ? "hidden md:inline" : "inline"}>
              {loading ? "Searching..." : "Search"}
            </span>
            {!loading && <ArrowRight size={14} className="md:hidden" />}
          </span>

          {/* Hover overlay - Subtle brightening effect */}
          {!loading && (
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          )}
        </button>
      </div>

     
    </motion.form>
  );
}
