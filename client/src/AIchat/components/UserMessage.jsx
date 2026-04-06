import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function UserMessage({ text }) {
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
