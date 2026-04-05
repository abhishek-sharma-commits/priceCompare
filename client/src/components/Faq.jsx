import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQ_DATA = [
  {
    id: "01",
    question: "How does the real-time sync actually work?",
    answer: "Our proprietary middleware connects directly to retail APIs. Instead of scraping HTML, we pull raw data objects every time a search is initiated."
  },
  {
    id: "02",
    question: "Is my personal shopping data stored?",
    answer: "Zero persistence. We operate on a 'Pass-Through' architecture. We analyze the product data, show you the results, and flush the session."
  }
];

export default function FAQ() {
  const [activeId, setActiveId] = useState(null);

  // Toggle function to ensure state updates
  const handleToggle = (id) => {
    setActiveId(prev => (prev === id ? null : id));
  };

  return (
    // Added relative z-30 to bring this above any background blurs
    <section id="FAQ" className="relative z-[99999] bg-black text-white py-32 px-6">
      
      {/* If you have a background glow, add pointer-events-none */}
      <div className="absolute top-0 left-0 w-full h-full bg-indigo-500/5 blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-20">
        <div className="lg:w-1/3">
          <p className="text-[10px] uppercase tracking-[0.4em] text-indigo-400 font-bold mb-6">03 // INQUIRIES</p>
          <h2 className="text-5xl md:text-6xl font-medium tracking-tighter leading-none mb-8">Frequently Asked</h2>
        </div>

        <div className="lg:w-2/3 border-t border-white/10">
          {FAQ_DATA.map((item) => (
            <div 
              key={item.id} 
              // Changed to a button-like div for better event handling
              className="border-b border-white/10 cursor-pointer select-none"
              onClick={() => handleToggle(item.id)}
            >
              <div className="flex items-center py-10 gap-8">
                <span className="font-mono text-xs text-indigo-500/50">{item.id}</span>
                <h3 className={`text-xl md:text-2xl transition-colors ${activeId === item.id ? 'text-white' : 'text-gray-400'}`}>
                  {item.question}
                </h3>
                <div className="ml-auto pointer-events-none">
                  {activeId === item.id ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </div>

              <div 
                className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  activeId === item.id ? 'max-h-80 opacity-100 mb-10' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="pl-12 text-gray-400 text-lg leading-relaxed max-w-2xl">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}