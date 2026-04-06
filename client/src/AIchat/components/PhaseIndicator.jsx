import { motion } from "framer-motion";
import { Brain, Search, Sparkles, Loader2, BadgeCheck } from "lucide-react";

export default function PhaseIndicator({ phase, label, status }) {
  const icons = [Brain, Search, Sparkles];
  const Icon = icons[phase - 1];

  const statusStyles = {
    idle: "text-white/20 border-white/5 bg-white/[0.02]",
    active: "text-[#a78bfa] border-purple-400/40 bg-purple-500/10 animate-pulse",
    done: "text-emerald-400 border-emerald-400/30 bg-emerald-500/10",
    error: "text-red-400 border-red-400/30 bg-red-500/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: phase * 0.1 }}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-[11px] font-mono uppercase tracking-wider transition-all duration-500 ${statusStyles[status]}`}
    >
      {status === "active" ? (
        <Loader2 size={12} className="animate-spin" />
      ) : (
        <Icon size={12} />
      )}
      <span>{label}</span>
      {status === "done" && <BadgeCheck size={11} className="ml-auto" />}
    </motion.div>
  );
}
