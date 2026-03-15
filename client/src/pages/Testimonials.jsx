import { Quote } from "lucide-react";

const FEEDBACK = [
  { name: "Agent_402", role: "Power Shopper", text: "Saved ₹4,000 on a MacBook air in seconds. The speed of comparison is unmatched." },
  { name: "TechHunter", role: "Gadget Reviewer", text: "The UI feels like I'm hacking the stock market, but for laundry detergent. Love it." }
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-[#080810]/50 border-y border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        {/* <RadarIcon className="mx-auto mb-8 text-[#2874F0] animate-pulse" /> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {FEEDBACK.map((f, i) => (
            <div key={i} className="relative p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
              <Quote className="absolute -top-4 left-8 text-[#FF9900] opacity-20" size={40} />
              <p className="text-lg text-white/80 font-display italic mb-6 leading-relaxed">"{f.text}"</p>
              <div className="text-left border-l-2 border-[#FF9900] pl-4">
                <p className="text-white font-black uppercase text-xs tracking-widest">{f.name}</p>
                <p className="text-[#4a4a65] text-[10px] font-mono uppercase">{f.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
