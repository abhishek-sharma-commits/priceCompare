import React from 'react';
import { ArrowUpRight, X } from 'lucide-react';

const About = () => {
  const stats = [
    { value: "1", label: "Unique framework for AI safety research and deployment" },
    { value: "100", label: "AI safety researchers and policy experts in our network" },
    { value: "170", label: "AI safety research papers published per year" },
    { value: "500", label: "Academic citations for our safety work" },
    { value: "20%", label: "Proportion of AI safety researchers globally who use our resources" },
    { value: "1200", label: "Participants in our annual safety research competition" },
  ];

  return (
    <div className="min-h-screen mt-20 text-black font-sans p-8 md:p-16">
      {/* --- Section 1: Research Feature --- */}
      <section className="max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Text Content */}
          <div className="md:col-span-5 space-y-12">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-2 h-2 bg-black rounded-full" />
                <span className="text-xs font-medium uppercase tracking-widest">Our Services</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-light leading-tight mb-4">
                We conduct impactful research on AI safety.
              </h1>
              <button className="flex items-center gap-1 text-sm border-b border-black pb-1 hover:opacity-60 transition-opacity">
                All Research <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12">
              <div>
                <h3 className="text-sm font-bold mb-4">AI Safety, Ethics, and Society</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  CAIS conducts technical and conceptual research. Our team develops benchmarks and methods designed to improve the safety of existing systems.
                </p>
                <button className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider hover:underline">
                  View Project <ArrowUpRight size={12} />
                </button>
              </div>
              <div>
                <h3 className="text-sm font-bold mb-4">Field-building</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Our goal is to create a thriving research ecosystem that will drive progress toward safe AI.
                </p>
                <button className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider hover:underline">
                  View Research <ArrowUpRight size={12} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="md:col-span-7 relative bg-gray-100 flex items-center justify-center overflow-hidden min-h-[400px]">
             {/* Close Button UI element from the reference */}
             <button className="absolute top-6 right-6 p-2 bg-black text-white rounded-full">
                <X size={20} />
             </button>
             
             {/* Placeholder for the silhouette image */}
             <img 
                src="https://i.pinimg.com/736x/0a/0e/92/0a0e928ef74f5cc42c528d7e58c00a19.jpg" 
                alt="AI Research Visual" 
                className="w-full h-[600px] object-cover  mix-blend-multiply opacity-90"
             />
          </div>
        </div>
      </section>

      {/* --- Section 2: Impact Stats --- */}
      <section className="max-w-7xl mx-auto border-t border-gray-100 ">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-2 h-2 bg-black rounded-full" />
          <span className="text-xs font-medium uppercase tracking-widest">Our Impact</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-4">
              <div className="text-4xl md:text-5xl font-light">{stat.value}</div>
              <p className="text-[10px] leading-snug text-gray-500 uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;