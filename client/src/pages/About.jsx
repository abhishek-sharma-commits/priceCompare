import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Globe, Zap, ArrowUpRight } from "lucide-react";

const FEATURES = [
  {
    icon: <Zap className="text-indigo-400" size={24} />,
    title: "Real-time Sync",
    desc: "We don't show yesterday's prices. Our engine fetches live data directly from global marketplaces."
  },
  {
    icon: <ShieldCheck className="text-indigo-400" size={24} />,
    title: "Unbiased Data",
    desc: "No sponsored rankings. We sort by pure value, ratings, and delivery speed for the best deal."
  },
  {
    icon: <Cpu className="text-indigo-400" size={24} />,
    title: "Advanced Aggregation",
    desc: "Custom middleware normalizes product specs across platforms for true comparisons."
  },
  {
    icon: <Globe className="text-indigo-400" size={24} />,
    title: "Platform Neutral",
    desc: "We bridge the gap between ecosystem silos, putting power back into consumer hands."
  }
];

export default function About() {
  return (
    <div id="About" className="relative text-white selection:bg-indigo-500/30 overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

      <main className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        {/* Editorial Hero */}
        <section className="mb-40">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <p className="text-[10px] uppercase tracking-[0.4em] text-indigo-400 font-bold mb-6">01 // THE GENESIS</p>
              <h1 className="text-5xl text-neutral-700 md:text-8xl font-medium tracking-tighter leading-[0.9]">
                Shopping, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 italic">Decoded.</span>
              </h1>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gray-500 font-mono text-[10px] uppercase tracking-widest hidden md:block"
            >
              System Status: Active <br />
              Version: 1.0.4_Build
            </motion.div>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl"
          >
            PriceRadar was built to solve a simple problem: the 15-minute 
            tab-switching marathon. We believe finding the best price shouldn't 
            be a chore—it should be an instant reflex.
          </motion.p>
        </section>

        {/* Feature Bento Grid */}
        <section className="mb-40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div 
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${
                  i === 0 || i === 3 ? "md:col-span-7" : "md:col-span-5"
                } group relative p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.05] transition-all duration-500 overflow-hidden`}
              >
                <div className="flex justify-between items-start mb-12">
                  <div className="p-3 bg-indigo-500/10 rounded-xl group-hover:scale-110 transition-transform">{f.icon}</div>
                  <ArrowUpRight className="text-gray-700 group-hover:text-white transition-colors" size={20} />
                </div>
                <h3 className="text-2xl font-medium tracking-tight mb-3 text-white">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[280px]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* The Mission Section */}
        <section className="pt-20 border-t border-black/5">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
               <p className="text-[10px] uppercase tracking-[0.4em] text-indigo-400 font-bold">02 // THE MISSION</p>
              <h2 className="text-4xl md:text-5xl text-neutral-700 font-medium tracking-tighter">Your digital advocate in a world of dynamic pricing.</h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                In an era of algorithm-driven inflation, PriceRadar leverages high-speed 
                caching layers to ensure you never overpay again. We don't just find deals; 
                we create transparency.
              </p>
              <div className="flex flex-wrap gap-3">
                {['React 18', 'Vite', 'Tailwind', 'Framermotion'].map((tech) => (
                  <span key={tech} className="px-4 py-1.5 bg-indigo-500/5 rounded-full text-[10px] font-mono text-indigo-300 border border-indigo-500/20 uppercase tracking-widest">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Decorative Tech Visual */}
            <div className="relative group cursor-none">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
              <div className="relative aspect-square md:aspect-video rounded-3xl bg-[#0a0a0c] border border-white/10 flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
                <div className="text-center space-y-2">
                   <div className="w-16 h-1 w-16 bg-indigo-500 rounded-full mx-auto animate-pulse" />
                   <span className="block font-mono text-[10px] text-gray-500 tracking-[0.3em]">PR-ENGINE_V1.0.4</span>
                   <span className="block font-mono text-[8px] text-indigo-400/50">SYSTEM_STABLE // NO_ERRORS_FOUND</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}