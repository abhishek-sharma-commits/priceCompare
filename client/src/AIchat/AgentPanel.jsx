import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, X, Zap } from "lucide-react";
import AgentChat from "./AgentChat";

export default function AgentPanel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 pl-4 pr-5 py-3 rounded-2xl shadow-2xl font-mono text-xs uppercase tracking-wider font-bold transition-all duration-300"
        style={{
          background: open
            ? "rgba(15,15,26,0.95)"
            : "linear-gradient(135deg, rgba(139,92,246,0.9), rgba(59,130,246,0.8))",
          border: open
            ? "1px solid rgba(168,139,250,0.3)"
            : "1px solid rgba(255,255,255,0.15)",
          color: "#fff",
          backdropFilter: "blur(12px)",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={14} />
            </motion.span>
          ) : (
            <motion.span
              key="brain"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Brain size={14} />
            </motion.span>
          )}
        </AnimatePresence>
        {open ? "Close Agent" : "AI Agent"}
        {!open && (
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
          </span>
        )}
      </motion.button>

      {/* Sliding panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%", scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: "100%", scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-20 right-6 z-40 w-[min(420px,calc(100vw-3rem))] h-[min(620px,calc(100vh-7rem))] flex flex-col rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: "rgba(10,10,20,0.92)",
              border: "1px solid rgba(168,139,250,0.15)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Panel header */}
            <div
              className="flex items-center gap-3 px-5 py-4 border-b flex-shrink-0"
              style={{ borderColor: "rgba(168,139,250,0.1)" }}
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 border border-purple-400/20 flex items-center justify-center">
                <Brain size={14} className="text-purple-300" />
              </div>
              <div>
                <p className="text-sm font-bold text-white/90 font-display">
                  Comparison Agent
                </p>
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                  Natural Language · AI-Powered
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-400/15">
                <Zap size={9} className="text-emerald-400" />
                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider">
                  Live
                </span>
              </div>
            </div>

            {/* Chat body */}
            <div className="flex-1 overflow-hidden">
              <AgentChat />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}