import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { AlertCircle, Radar, Search } from "lucide-react";

function PlatformHeader({ source, count, loading }) {
  const isAmazon = source === "amazon";
  const color = isAmazon ? "#FF9900" : "#2874F0";
  const label = isAmazon ? "Amazon.in" : "Flipkart.com";

  return (
    <div className="flex items-center justify-between mb-5 px-2">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center">
          <div className="w-2 h-2 rounded-full z-10" style={{ background: color }} />
          <div className="absolute w-4 h-4 rounded-full opacity-30 animate-ping" style={{ background: color }} />
        </div>
        <h2 className="text-[11px] font-black font-mono uppercase tracking-[0.25em]" style={{ color }}>
          {label}
        </h2>
      </div>
      
      {!loading && (
        <div className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono text-[#4a4a65]">
          {count || 0} SELECTIONS
        </div>
      )}
    </div>
  );
}

export default function ResultsGrid({ results, loading, query }) {
  const skeletonCount = 3;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto"
    >
      {/* HUD Meta Info */}
      {query && !loading && (
        <div className="flex items-center justify-center gap-4 mb-10 overflow-hidden">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <p className="text-[10px] font-mono uppercase tracking-widest text-white whitespace-nowrap">
            Comparison Matrix <span className="text-black/20 mx-2">/</span> 
            <span className="text-white/80">"{query}"</span>
          </p>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>
      )}

      {/* Main Grid: Stacked on Mobile, Side-by-Side on MD+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Amazon Stream */}
        <div className="space-y-4">
          <PlatformHeader source="amazon" count={results?.amazon?.length} loading={loading} />
          <div className="flex flex-col gap-4">
            {loading
              ? Array.from({ length: skeletonCount }).map((_, i) => <SkeletonCard key={i} />)
              : results?.amazon?.length > 0
              ? results.amazon.map((p, i) => <ProductCard key={i} product={p} source="amazon" index={i} />)
              : <EmptyState source="amazon" />}
          </div>
        </div>

        {/* Flipkart Stream */}
        <div className="space-y-4">
          <PlatformHeader source="flipkart" count={results?.flipkart?.length} loading={loading} />
          <div className="flex flex-col gap-4">
            {loading
              ? Array.from({ length: skeletonCount }).map((_, i) => <SkeletonCard key={i} />)
              : results?.flipkart?.length > 0
              ? results.flipkart.map((p, i) => <ProductCard key={i} product={p} source="flipkart" index={i} />)
              : <EmptyState source="flipkart" />}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function EmptyState({ source }) {
  const isAmazon = source === "amazon";
  const color = isAmazon ? "#FF9900" : "#2874F0";
  
  return (
    <div className="relative group overflow-hidden bg-[#0f0f1a]/20 border border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center transition-colors hover:border-white/20">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="relative mb-4">
        <Radar size={32} className="text-[#3a3a55] animate-pulse" />
        <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500/50 blur-[2px]" />
      </div>
      
      <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-1">
        No Signal Detected
      </h3>
      <p className="text-[10px] text-[#3a3a55] font-mono leading-relaxed max-w-[180px]">
        0 products found on {isAmazon ? "Amazon" : "Flipkart"} matching current parameters.
      </p>
    </div>
  );
}