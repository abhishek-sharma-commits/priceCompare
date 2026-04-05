import { Quote } from "lucide-react";

const FEEDBACK = [
  { 
    name: "Agent_402", 
    role: "Power Shopper", 
    text: "Saved ₹4,000 on a MacBook air in seconds. The speed of comparison is unmatched." 
  },
  { 
    name: "TechHunter", 
    role: "Gadget Reviewer", 
    text: "The UI feels like I'm hacking the stock market, but for laundry detergent. Love it." 
  }
];

export default function Testimonials() {
  return (
    <section id="Testimonials" className="relative px-6  overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-[10px] uppercase tracking-[0.3em] text-indigo-400 font-bold mb-4">Community Feedback</p>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-neutral-700">
            Trusted by the <br /> modern consumer.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FEEDBACK.map((f, i) => (
            <div 
              key={i} 
              className="group relative p-10 rounded-[2rem] border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-500"
            >
              {/* Animated Quote Icon */}
              <div className="mb-8 opacity-40 group-hover:opacity-100 transition-opacity">
                <Quote className="text-indigo-400" size={32} fill="currentColor" fillOpacity={0.1} />
              </div>
              
              <blockquote className="text-xl md:text-2xl text-gray-600 font-light leading-snug tracking-tight mb-12">
                "{f.text}"
              </blockquote>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div>
                  <p className="text-sm font-bold text-neutral-700 tracking-wide">{f.name}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">{f.role}</p>
                </div>
                
                {/* Decorative Element */}
                <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-transparent rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}