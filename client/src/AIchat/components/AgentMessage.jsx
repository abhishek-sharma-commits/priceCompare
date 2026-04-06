import { motion } from "framer-motion";
import { Brain, Zap } from "lucide-react";
import PhaseIndicator from "./PhaseIndicator";
import ParamBadge from "./ParamBadge";
import ProductCard from "../../components/ProductCard";

export default function AgentMessage({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-2"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/30 border border-purple-400/20 flex items-center justify-center flex-shrink-0">
          <Brain size={11} className="text-purple-300" />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">
          AI Agent
        </span>
      </div>

      {/* Phase Tracker */}
      {message.phases && (
        <div className="ml-8 flex flex-col gap-1.5">
          <>
            <PhaseIndicator
              phase={1}
              label="Extract Parameters"
              status={message.phases[1]}
            />
            <PhaseIndicator
              phase={2}
              label="Search Platforms"
              status={message.phases[2]}
            />
            <PhaseIndicator
              phase={3}
              label="Synthesize Results"
              status={message.phases[3]}
            />
          </>
        </div>
      )}

      {/* Extracted params */}
      {message.params && (
        <div className="ml-8">
          <ParamBadge params={message.params} />
        </div>
      )}

      {/* Search stats */}
      {message.searchStats && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="ml-8 flex items-center gap-3 mt-1"
        >
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-amber-400/70">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400/50" />
            Amazon · {message.searchStats.amazon} found
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-blue-400/70">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400/50" />
            Flipkart · {message.searchStats.flipkart} found
          </span>
        </motion.div>
      )}

      {/* Overall reasoning */}
      {message.reasoning && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="ml-8 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/8 text-[12px] text-white/60 leading-relaxed"
        >
          {message.reasoning}
        </motion.div>
      )}

      {/* Top picks */}
      {message.topPicks && message.topPicks.length > 0 && (
        <div className="ml-8 flex flex-col gap-2 mt-1">
          <div className="flex items-center gap-2">
            <Zap size={10} className="text-purple-400" />
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30">
              Top Picks
            </span>
          </div>
          {message.topPicks.map((product, i) => (
            <ProductCard key={i} product={product} source={product.source} index={i} />
          ))}
        </div>
      )}

      {/* Error */}
      {message.error && (
        <div className="ml-8 px-3 py-2.5 rounded-xl bg-red-500/5 border border-red-400/15 text-[12px] text-red-400/80">
          {message.error}
        </div>
      )}
    </motion.div>
  );
}
