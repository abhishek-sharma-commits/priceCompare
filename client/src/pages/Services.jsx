import { motion } from "framer-motion";
import { Zap, Shield, BarChart3, Globe } from "lucide-react";

const MODULES = [
  {
    icon: <Zap size={24} />,
    title: "Real-Time Intercept",
    desc: "Direct API hooks into Amazon and Flipkart for sub-second price accuracy."
  },
  {
    icon: <Shield size={24} />,
    title: "Verified Sources",
    desc: "Only pulls data from official listings to avoid third-party scalper noise."
  },
  {
    icon: <BarChart3 size={24} />,
    title: "Price Delta Analysis",
    desc: "Instant calculation of the price gap between platforms to find the true winner."
  },
  {
    icon: <Globe size={24} />,
    title: "Universal Search",
    desc: "Proprietary matching algorithm that aligns product variants across sites."
  }
];

export default function Services() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-[#FF9900] mb-2">System Capabilities</h2>
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Core Modules</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MODULES.map((m, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-[#0f0f1a]/40 border border-white/5 backdrop-blur-md group hover:border-[#FF9900]/30 transition-all"
            >
              <div className="text-[#FF9900] mb-4 group-hover:scale-110 transition-transform duration-300">
                {m.icon}
              </div>
              <h4 className="text-white font-bold mb-2 uppercase text-sm tracking-widest">{m.title}</h4>
              <p className="text-[#6b6b8a] text-xs leading-relaxed font-mono">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}