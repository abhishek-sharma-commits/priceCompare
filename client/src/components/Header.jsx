import { Zap, Search as SearchIcon, LogIn, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Header({ view, setView }) {
  const { isAuthed, user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full px-6 py-4">
      <div className="max-w-6xl mx-auto h-14 px-6 flex items-center justify-between bg-[#000]/15 border border-white/5 backdrop-blur-2xl rounded-2xl shadow-2xl">
        
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
        <nav className="hidden md:flex items-center gap-1 p-1 bg-black/10 rounded-xl border border-white/5">
          <a href="#search">
            <button
              onClick={() => setView && setView("search")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                view === "search" 
                  ? "bg-[#FF9900] text-black shadow-lg" 
                  : "text-[#fff] hover:text-white hover:bg-white/5"
              }`}
            >
              <SearchIcon size={14} />
              Compare
            </button>
          </a>
          <span className="text-gray-500">|</span>

          <a className="transition-transform duration-300" href="#About">
            <button
              onClick={() => setView && setView("about")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                view === "about" 
                  ? "bg-[#FF9900] text-black shadow-lg" 
                  : "text-[#6b6b8a] hover:text-white hover:bg-white/5"
              }`}
            >
              About
            </button>
          </a>
          <span className="text-gray-500">|</span>

          <a className="transition-transform duration-300" href="#Testimonials">
            <button
              onClick={() => setView && setView("testimonials")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                view === "testimonials" 
                  ? "bg-[#FF9900] text-black shadow-lg" 
                  : "text-[#6b6b8a] hover:text-white hover:bg-white/5"
              }`}
            >
              Testimonials
            </button>
          </a>
          <span className="text-gray-500">|</span>

          <a className="transition-transform duration-300" href="/ai-agent">
            <button
              className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium transition-all text-[#6b6b8a] hover:text-white hover:bg-white/5"
            >
              <Zap size={14} />
              AI Agent
            </button>
          </a>
        </nav>

        {/* Status Indicator */}
        <div className="flex items-center gap-3 bg-[#000]/10 border border-white/5 rounded-xl px-3 py-1">
          {isAuthed ? (
            <button
              onClick={onLogout}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 bg-white/[0.02] text-[10px] font-mono text-white/70 uppercase tracking-wider hover:bg-white/[0.05]"
              title="Logout"
            >
              <LogOut size={12} />
              {user?.name || "Account"}
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-[10px] font-mono text-white/70 uppercase tracking-wider hover:bg-white/[0.05]"
              title="Login"
            >
              <LogIn size={12} />
              Login
            </Link>
          )}
          {/* <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/5 border border-emerald-500/10 rounded-full text-[10px] font-mono text-emerald-500 uppercase tracking-wider">
            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            Live Sync
          </div> */}
          
          <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
          
          {/* <div className="flex items-center gap-1.5 text-[10px] font-mono text-white uppercase tracking-tighter">
            v1.0.4
          </div> */}
        </div>
      </div>
    </header>
  );
}