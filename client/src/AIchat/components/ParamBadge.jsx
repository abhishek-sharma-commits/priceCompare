import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import ParamRow from "./ParamRow";

export default function ParamBadge({ params }) {
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
