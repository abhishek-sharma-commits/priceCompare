import { motion } from "framer-motion";
import { Brain, ChevronRight } from "lucide-react";

export default function SuggestedPrompts({ onSelect }) {
  const prompts = [
    "laptop under 45k",
    "iPhone 15 best price",
    "gaming headphones under 5000",
    "Sony TV 55 inch best deal",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3"
    >
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/30 border border-purple-400/20 flex items-center justify-center">
          <Brain size={11} className="text-purple-300" />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">
          AI Agent · Ready
        </span>
      </div>
      <p className="text-sm text-white/50 font-body pl-8">
        Tell me what you're looking for in plain English. I'll search Amazon &
        Flipkart and find the best deal.
      </p>
      <div className="pl-8 flex flex-col gap-1.5">
        {prompts.map((p, i) => (
          <motion.button
            key={p}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => onSelect(p)}
            className="group flex items-center gap-2.5 text-left px-3 py-2 rounded-xl border border-white/6 bg-white/[0.02] hover:bg-white/[0.05] hover:border-purple-400/20 transition-all duration-200 text-[12px] text-white/50 font-mono"
          >
            <ChevronRight
              size={10}
              className="text-white/20 group-hover:text-purple-400 transition-colors"
            />
            {p}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
