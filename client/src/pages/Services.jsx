import { motion } from "framer-motion";
import { Zap, Shield, BarChart3, Globe, ArrowUpRight } from "lucide-react";

const MODULES = [
  {
    icon: <Zap size={20} />,
    title: "Real-Time Intercept",
    desc: "Direct API hooks into global marketplaces for sub-second price accuracy."
  },
  {
    icon: <Shield size={20} />,
    title: "Verified Sources",
    desc: "Only pulls data from official listings to avoid third-party scalper noise."
  },
  {
    icon: <BarChart3 size={20} />,
    title: "Price Delta Analysis",
    desc: "Instant calculation of the price gap between platforms to find the winner."
  },
  {
    icon: <Globe size={20} />,
    title: "Universal Search",
    desc: "Proprietary matching algorithm that aligns product variants across sites."
  }
];

export default function Services() {
  return (
    <section id="Services" className="relative py-32 px-6 bg-black overflow-hidden selection:bg-indigo-500/30">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-indigo-400 font-bold mb-4">
              04 // SYSTEM CAPABILITIES
            </p>
            <h2 className="text-5xl md:text-7xl font-medium text-white tracking-tighter leading-[0.85]">
              Core <br />
              <span className="italic text-gray-500">Modules</span>
            </h2>
          </div>
          <p className="text-gray-500 text-sm font-mono max-w-[240px] leading-relaxed hidden md:block">
            Engineered for high-frequency data ingestion and variant normalization.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-white/10">
          {MODULES.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-8 border-b border-white/10 md:border-r last:border-r-0 transition-all duration-500 hover:bg-white/[0.02]"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-16">
                <div className="text-white bg-white/5 p-3 rounded-lg group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-all duration-500">
                  {m.icon}
                </div>
                <ArrowUpRight size={16} className="text-gray-700 group-hover:text-white transition-colors" />
              </div>

              {/* Card Content */}
              <div className="space-y-4">
                <h4 className="text-white font-medium text-xl tracking-tight">
                  {m.title}
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed font-mono">
                  {m.desc}
                </p>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/[0.03] transition-colors pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}