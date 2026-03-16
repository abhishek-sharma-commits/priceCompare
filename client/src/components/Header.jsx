import { GitCompare, Zap, Info, Search as SearchIcon } from "lucide-react";

export default function Header({ view, setView }) {
  return (
    <header className="sticky top-0 z-50 w-full px-6 py-4">
      <div className="max-w-6xl mx-auto h-14 px-6 flex items-center justify-between bg-[#0f0f1a]/60 border border-white/5 backdrop-blur-2xl rounded-2xl shadow-2xl">
        
        {/* Logo Section */}
        <button 
          onClick={() => setView("search")}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="p-1.5">
            <video src="./src/assets/logo.mp4" autoPlay muted loop className=" rounded-xl h-8 object-contain" />
          </div>
          <span className="font-display font-bold text-base tracking-tight text-white">
            Price<span className="text-gray-500">Radar</span>
          </span>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-black/20 rounded-xl border border-white/5">
        <a href="#search">
          <button
            onClick={() => setView("search")}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
              view === "search" 
              ? "bg-[#FF9900] text-black shadow-lg" 
              : "text-[#6b6b8a] hover:text-white hover:bg-white/5"
            }`}
          >
            <SearchIcon size={14} />
            Compare
          </button>
          </a>

          <a className="transition-transform duration-300" href="#About">
            <button
              onClick={() => setView("about")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                view === "about" 
                ? "bg-[#FF9900] text-black shadow-lg" 
                : "text-[#6b6b8a] hover:text-white hover:bg-white/5"
              }`}
            >
              <Info size={14} />
              About
            </button>
          </a>
        </nav>

        {/* Status Indicator */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/5 border border-emerald-500/10 rounded-full text-[10px] font-mono text-emerald-500 uppercase tracking-wider">
            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            Live Sync
          </div>
          
          <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
          
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-white uppercase tracking-tighter">
            v1.0.4
          </div>
        </div>
      </div>
    </header>
  );
}