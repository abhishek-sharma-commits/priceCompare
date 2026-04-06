import { useState, useRef, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Search,
  Sparkles,
  Send,
  ChevronRight,
  Star,
  ExternalLink,
  Zap,
  Trophy,
  BadgeCheck,
  Cpu,
  ArrowRight,
  Package,
  Loader2,
  X,
  IndianRupee,
  ShoppingBag,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ─── Sub-components ──────────────────────────────────────────────────────────

function PhaseIndicator({ phase, label, status }) {
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

function ParamBadge({ params }) {
  if (!params) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden"
    >
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5 bg-white/[0.02]">
        <Cpu size={10} className="text-purple-400" />
        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40">
          Extracted Parameters
        </span>
      </div>
      <div className="px-3 py-2.5 grid grid-cols-2 gap-2">
        <ParamRow label="Product" value={params.product} />
        <ParamRow
          label="Budget"
          value={
            params.budget
              ? `₹${params.budget.toLocaleString("en-IN")}`
              : "No limit"
          }
        />
        <ParamRow label="Category" value={params.category} />
        <ParamRow
          label="Platforms"
          value={params.platforms?.join(" + ") || "All"}
        />
        {params.keywords?.length > 0 && (
          <div className="col-span-2">
            <ParamRow label="Keywords" value={params.keywords.join(", ")} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ParamRow({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[8px] font-mono uppercase tracking-widest text-white/25">
        {label}
      </span>
      <span className="text-[11px] font-mono text-white/70 truncate capitalize">
        {value || "—"}
      </span>
    </div>
  );
}

function AgentProductCard({ product, index }) {
  const isAmazon = product.source === "amazon";
  const accent = isAmazon ? "#FF9900" : "#2874F0";

  const rankBadgeColor = {
    1: "from-amber-400/20 to-amber-500/5 border-amber-400/30 text-amber-300",
    2: "from-slate-400/20 to-slate-500/5 border-slate-400/30 text-slate-300",
    3: "from-orange-700/20 to-orange-800/5 border-orange-700/30 text-orange-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm overflow-hidden"
      style={{ borderColor: `${accent}18` }}
    >
      {/* Rank ribbon */}
      <div
        className={`absolute top-0 left-0 right-0 h-0.5`}
        style={{ background: `linear-gradient(90deg, ${accent}60, transparent)` }}
      />

      <div className="p-4 flex flex-col gap-3">
        {/* Rank + Badge */}
        <div className="flex items-center justify-between gap-2">
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r border text-[9px] font-mono font-bold uppercase tracking-wider ${rankBadgeColor[product.rank] || rankBadgeColor[3]}`}
          >
            <Trophy size={9} />
            #{product.rank} {product.badge}
          </div>
          <span
            className="text-[9px] font-mono uppercase tracking-widest px-2 py-1 rounded-lg border"
            style={{ color: accent, borderColor: `${accent}25`, background: `${accent}10` }}
          >
            {isAmazon ? "Amazon" : "Flipkart"}
          </span>
        </div>

        {/* Product info */}
        <div className="flex gap-3">
          {product.imageUrl ? (
            <div className="w-16 h-16 flex-shrink-0 rounded-xl bg-white p-1.5 shadow-lg">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply"
                onError={(e) => {
                  e.target.parentElement.innerHTML =
                    '<div class="w-full h-full flex items-center justify-center"><svg class="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="1.5" d="M20 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/></svg></div>';
                }}
              />
            </div>
          ) : (
            <div className="w-16 h-16 flex-shrink-0 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center">
              <Package size={20} className="text-white/20" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-white/80 line-clamp-2 leading-snug mb-1.5">
              {product.name}
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="text-lg font-black font-mono tracking-tight"
                style={{ color: accent }}
              >
                {product.price}
              </span>
              {product.discount && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/15">
                  {product.discount}
                </span>
              )}
              {product.rating && (
                <span className="flex items-center gap-1 text-[10px] font-mono text-amber-400">
                  <Star size={9} fill="currentColor" />
                  {product.rating}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* AI Reason */}
        <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-purple-500/5 border border-purple-400/15">
          <Sparkles size={11} className="text-purple-400 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-white/60 leading-relaxed">{product.reason}</p>
        </div>

        {/* CTA */}
        {product.productUrl && (
          <a
            href={product.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-80 active:scale-95"
            style={{
              background: `${accent}20`,
              color: accent,
              border: `1px solid ${accent}20`,
            }}
          >
            View on {isAmazon ? "Amazon" : "Flipkart"}
            <ExternalLink size={10} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

function AgentMessage({ message }) {
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

function UserMessage({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-2 justify-end"
    >
      <div className="max-w-[80%] px-3.5 py-2.5 rounded-2xl rounded-tr-sm bg-white/8 border border-white/10 text-sm text-white/80 font-body">
        {text}
      </div>
      <div className="w-6 h-6 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
        <ShoppingBag size={11} className="text-white/40" />
      </div>
    </motion.div>
  );
}

function SuggestedPrompts({ onSelect }) {
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

// ─── Main Component ──────────────────────────────────────────────────────────

export default function AgentChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const pushMessage = (msg) => setMessages((prev) => [...prev, msg]);

  const updateLastAgentMessage = (updater) => {
    setMessages((prev) => {
      const copy = [...prev];
      const last = copy[copy.length - 1];
      if (last && last.type === "agent") {
        copy[copy.length - 1] = updater(last);
      }
      return copy;
    });
  };

  const handleSend = async (query) => {
    const text = (query || input).trim();
    if (!text || isThinking) return;

    setInput("");
    setIsThinking(true);

    // User message
    pushMessage({ type: "user", text });

    // Initial agent message with all phases idle
    pushMessage({
      type: "agent",
      phases: { 1: "active", 2: "idle", 3: "idle" },
    });

    try {
      // Small delay to let first render paint
      await new Promise((r) => setTimeout(r, 300));

      const { data } = await axios.get(
        `/api/agent/run?query=${encodeURIComponent(text)}`
      );

      // Phase 1 done → show params, activate phase 2
      updateLastAgentMessage((m) => ({
        ...m,
        phases: { 1: "done", 2: "active", 3: "idle" },
        params: data.params,
      }));

      await new Promise((r) => setTimeout(r, 400));

      // Phase 2 done → show search stats, activate phase 3
      updateLastAgentMessage((m) => ({
        ...m,
        phases: { 1: "done", 2: "done", 3: "active" },
        searchStats: {
          amazon: data.products?.amazon?.length || 0,
          flipkart: data.products?.flipkart?.length || 0,
        },
      }));

      await new Promise((r) => setTimeout(r, 600));

      // Phase 3 done → show results
      updateLastAgentMessage((m) => ({
        ...m,
        phases: { 1: "done", 2: "done", 3: "done" },
        reasoning: data.reasoning,
        topPicks: data.topPicks,
      }));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login", { state: { from: "/ai-agent" } });
      }
      const errorMsg =
        err.response?.data?.error ||
        (err.response?.status === 401
          ? "Please login to use the agent."
          : "Agent failed. Please try again.");
      updateLastAgentMessage((m) => ({
        ...m,
        phases: { 1: "error", 2: "error", 3: "error" },
        error: errorMsg,
      }));
    } finally {
      setIsThinking(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6 scrollbar-thin">
        {messages.length === 0 ? (
          <SuggestedPrompts onSelect={(p) => handleSend(p)} />
        ) : (
          messages.map((msg, i) =>
            msg.type === "user" ? (
              <UserMessage key={i} text={msg.text} />
            ) : (
              <AgentMessage key={i} message={msg} />
            )
          )
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="border-t inset-y-0 border-white/5 bg-white/[0.02] px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-white/8 bg-white/[0.03] focus-within:border-purple-400/30 transition-colors">
            <Brain size={13} className="text-white/20 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isThinking ? "Agent is working..." : 'Try "laptop under 45k"…'
              }
              disabled={isThinking}
              className="flex-1 bg-transparent text-sm text-white/80 placeholder:text-white/20 font-body outline-none disabled:opacity-40"
            />
            <AnimatePresence>
              {input && !isThinking && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => setInput("")}
                  className="text-white/20 hover:text-white/40 transition-colors"
                >
                  <X size={12} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isThinking}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-90"
            style={{
              background: isThinking
                ? "rgba(168,139,250,0.1)"
                : "rgba(168,139,250,0.2)",
              border: "1px solid rgba(168,139,250,0.2)",
              color: "#a78bfa",
            }}
          >
            {isThinking ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Send size={15} />
            )}
          </button>
        </div>
        <p className="mt-2 text-center text-[9px] font-mono text-white/15 uppercase tracking-widest">
          PriceBuddy · 3 requests/min
        </p>
      </div>
    </div>
  );
}