import React from "react";

export default function Footer() {
  return (
    <footer className="relative w-full bg-black text-white px-6 py-12 md:px-12 overflow-hidden border-t border-white/10">
      {/* Background Mesh Gradient Effect */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[300px] opacity-50 blur-[100px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.8) 0%, rgba(168,85,247,0.4) 50%, transparent 100%)"
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-10">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-widest text-gray-400">Live Limitless</p>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
              hello@priceradar.io
            </h2>
            <nav className="flex gap-8 pt-4">
              {["How it works", "Who Benefits", "Events", "Learn More"].map((item) => (
                <a key={item} href="#" className="text-xs text-gray-400 hover:text-white transition-colors">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <div className="max-w-[200px] space-y-4">
            <h3 className="text-lg font-medium">Upgrade Your Reality</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Join the waitlist and get priority access to our engine.
            </p>
            <button className="bg-white text-black px-6 py-2 rounded-full text-xs font-bold hover:bg-gray-200 transition-all">
              Join Waitlist
            </button>
          </div>
        </div>

        {/* Socials Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 text-center border-t border-white/10 pt-10 pb-2">
          {["Instagram", "GitHub", "Twitter X", "LinkedIn", "Discord", "Youtube"].map((social) => (
            <a 
              key={social} 
              href="#" 
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              {social}
            </a>
          ))}
        </div>

        {/* Massive Logo Text */}
        <div className="mt-4">
          <h1 className="text-[16vw]  text-center text-white/30 font-extrabold backdrop-blur-sm tracking-tighter leading-none uppercase select-none">
            Price <span className="text-white/10 backdrop-blur-sm">Radar</span>
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t border-white/5 text-[10px] text-gray-500 tracking-widest">
          <p>©2026 PRICERADAR. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 uppercase">
            <a href="#" className="hover:text-white">Privacy policy</a>
            <a href="#" className="hover:text-white">Terms and conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}