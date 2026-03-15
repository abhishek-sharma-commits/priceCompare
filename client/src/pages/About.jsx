import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Globe, Zap } from "lucide-react";
import Header from "../components/Header";

const FEATURES = [
  {
    icon: <Zap className="text-amber-500" size={20} />,
    title: "Real-time Sync",
    desc: "We don't show yesterday's prices. Our engine fetches live data directly from Amazon and Flipkart APIs."
  },
  {
    icon: <ShieldCheck className="text-emerald-500" size={20} />,
    title: "Unbiased Data",
    desc: "No sponsored rankings. We sort by pure value, ratings, and delivery speed to give you the best deal."
  },
  {
    icon: <Cpu className="text-blue-500" size={20} />,
    title: "Advanced Aggregation",
    desc: "Our custom middleware normalizes product specs across platforms for a true apples-to-apples comparison."
  },
  {
    icon: <Globe className="text-purple-500" size={20} />,
    title: "Platform Neutral",
    desc: "We bridge the gap between ecosystem silos, putting the power back into the consumer's hands."
  }
];

export default function About() {
  return (
    <div className="min-h-screen relative text-white">
      
      <main className="max-w-4xl mx-auto px-6 py-20 relative z-10">
        {/* Hero Section */}
        <section className="mb-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-extrabold mb-6"
          >
            Shopping, <span className="text-[#FF9900]">Decoded.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white text-lg leading-relaxed max-w-2xl mx-auto"
          >
            PriceRadar was built to solve a simple problem: the 15-minute 
            tab-switching marathon. We believe finding the best price shouldn't 
            be a chore—it should be an instant reflex.
          </motion.p>
        </section>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {FEATURES.map((f, i) => (
            <motion.div 
              key={f.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-colors"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-[#6b6b8a] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack / Manifesto */}
        <section className="border-t border-white/5 pt-20">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-2xl font-display font-bold mb-4">The Mission</h2>
              <p className="text-white text-sm leading-relaxed mb-4">
                In an era of dynamic pricing and algorithm-driven inflation, 
                PriceRadar acts as your digital advocate. We leverage high-speed 
                scraping and caching layers to ensure you never overpay again.
              </p>
              <div className="flex gap-4">
                <div className="px-3 py-1 bg-white/5 rounded text-[10px] font-mono text-[#FF9900] border border-[#FF9900]/20">REACT 18</div>
                <div className="px-3 py-1 bg-white/5 rounded text-[10px] font-mono text-blue-400 border border-blue-400/20">VITE</div>
                <div className="px-3 py-1 bg-white/5 rounded text-[10px] font-mono text-emerald-400 border border-emerald-400/20">TAILWIND</div>
              </div>
            </div>
            <div className="flex-1 w-full aspect-video rounded-2xl bg-gradient-to-br from-[#FF9900]/20 to-[#2874F0]/20 border border-white/10 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 opacity-20 pointer-events-none grayscale bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
               <span className="font-mono text-xs text-white/40">PR-ENGINE_V1.0.4</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}