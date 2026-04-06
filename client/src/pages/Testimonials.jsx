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
    <section id="Testimonials" className="relative px-6 py-24 overflow-hidden bg-[#fafafa]">
      {/* Subtle Background Glow - Adjusted for a light UI. 
         If you are on a dark theme, change bg-white to bg-black and text colors to white.
      */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-20 border-l-2 border-indigo-500 pl-8">
          <p className="text-[10px] uppercase tracking-[0.4em] text-indigo-500 font-bold mb-2">
            Community Feedback
          </p>
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-black leading-[0.9]">
            Trusted by the <br /> 
            <span className="font-medium italic">modern</span> consumer.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FEEDBACK.map((f, i) => (
            <div 
              key={i} 
              className="group relative p-12 rounded-3xl border border-black/5 bg-white hover:border-indigo-500/30 transition-all duration-700 ease-in-out hover:shadow-[0_20px_50px_rgba(79,70,229,0.05)]"
            >
              {/* Quote Icon - Moved to a floating position for a more "designed" feel */}
              <div className="absolute top-8 right-10 opacity-10 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                <Quote className="text-indigo-600" size={40} />
              </div>
              
              <blockquote className="text-2xl md:text-3xl text-black font-light leading-[1.1] tracking-tight mb-16 max-w-[90%]">
                "{f.text}"
              </blockquote>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm font-bold text-black tracking-tight">{f.name}</p>
                  <p className="text-[10px] text-indigo-500 font-semibold uppercase tracking-widest mt-1">
                    {f.role}
                  </p>
                </div>
                
                {/* Visual Serial Number - adds that 'Agent' / Tech vibe */}
                <div className="text-[10px] font-mono text-gray-300">
                  REF / 00{i + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}