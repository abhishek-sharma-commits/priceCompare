import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Menu, ArrowRight, Shield } from "lucide-react";

export default function Login() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  // Form State
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    // Basic Validation
    if (mode === "register" && !name) {
      setError("PROTOCOL_ERROR: NAME_REQUIRED");
      return;
    }
    if (!email || !password) {
      setError("PROTOCOL_ERROR: MISSING_CREDENTIALS");
      return;
    }

    setBusy(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        // Ensure your AuthContext register function accepts (name, email, password)
        await register(name, email, password);
      }
      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error("Auth Failure:", err);
      setError(err.response?.data?.error || "PROTOCOL_ERROR: AUTH_FAILED");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="h-screen bg-[#0d0d0d] text-white font-sans selection:bg-cyan-500 relative flex items-center justify-center p-4 md:p-10 overflow-hidden">
      
      {/* --- BACKGROUND VISUALS --- */}
      {/* Large Blurred Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Chromatic Aberration Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[410px] h-[410px] rounded-full border border-red-500/20 mix-blend-screen pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[390px] h-[390px] rounded-full border border-cyan-500/20 mix-blend-screen pointer-events-none animate-pulse [animation-delay:1s]" />

      {/* --- MAIN POSTER CONTAINER --- */}
      <div className="relative z-10 w-full max-w-6xl aspect-[16/10] bg-[#141414] border border-white/10 flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header Bar */}
      

        {/* Content Section */}
        <div className="flex-1 flex flex-col md:flex-row">
          
          {/* Left Column: Input Form */}
          <div className="flex-1 p-8 md:p-20 border-r border-white/5 flex flex-col justify-center">
            <form onSubmit={onSubmit} noValidate className="space-y-12 max-w-sm w-full mx-auto md:mx-0">
              
              <div className="space-y-8">
                <AnimatePresence mode="wait">
                  {mode === "register" && (
                    <motion.div 
                      key="name-input"
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -10 }}
                      className="relative"
                    >
                      <input
                        className="w-full bg-transparent border-b border-white/20 py-3 text-sm outline-none focus:border-white transition-all placeholder:text-white/10"
                        placeholder="IDENTIFIED_AS: (FULL NAME)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <input
                  className="w-full bg-transparent border-b border-white/20 py-3 text-sm outline-none focus:border-white transition-all placeholder:text-white/10"
                  placeholder="EMAIL_ADDRESS"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  className="w-full bg-transparent border-b border-white/20 py-3 text-sm outline-none focus:border-white transition-all placeholder:text-white/10"
                  placeholder="SECURITY_PASSPHRASE"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="text-[10px] font-mono text-red-500 uppercase tracking-widest border-l border-red-500 pl-3"
                >
                  {error}
                </motion.p>
              )}

              <div className="space-y-6">
                <button
                  type="submit"
                  disabled={busy}
                  className="relative group w-full bg-white text-black py-5 text-[11px] font-black uppercase tracking-[0.3em] overflow-hidden transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {/* Glitch Overlay Layers */}
                  <div className="absolute inset-0 bg-cyan-400 mix-blend-screen opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-transform duration-75" />
                  <div className="absolute inset-0 bg-red-400 mix-blend-screen opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-transform duration-75" />
                  
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {busy ? <Loader2 size={16} className="animate-spin" /> : mode === "login" ? "Initialize Login" : "Execute Registration"}
                  </span>
                </button>

                {/* Toggle Mode Button */}
                <button
                  type="button"
                  onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
                  className="w-full flex items-center justify-between group pt-4"
                >
                  <span className="text-[9px] uppercase tracking-[0.4em] text-white/30 group-hover:text-white/60 transition-colors">
                    {mode === "login" ? "Access unauthorized?" : "Credentials exists?"}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-cyan-400 group-hover:gap-4 transition-all">
                    {mode === "login" ? "Register" : "Login"} <ArrowRight size={14} />
                  </div>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Large Typography Statement */}
          <div className="flex-1 p-8 md:p-20 flex flex-col justify-center relative bg-[#181818]/40">
            <div className="relative z-10">
              <h2 className="text-8xl md:text-9xl font-serif italic relative leading-[0.8] select-none">
                {mode === "login" ? "Login" : "Join"}
                <span className="block not-italic font-sans font-black tracking-tighter text-right border-t border-white mt-8 pt-8 text-5xl md:text-7xl">
                   — Us
                </span>
                
                {/* Visual Glitch Text Echoes */}
                <span className="absolute top-0 left-1 text-cyan-500 opacity-20 blur-[2px] mix-blend-screen -z-10">{mode === "login" ? "Login" : "Join"}</span>
                <span className="absolute top-0 -left-1 text-red-500 opacity-20 blur-[2px] mix-blend-screen -z-10">{mode === "login" ? "Login" : "Join"}</span>
              </h2>
              
              <p className="mt-16 text-[11px] leading-relaxed text-white/30 max-w-[280px] uppercase tracking-[0.25em] font-light">
                {mode === "login" 
                  ? "Authentication required to sync with global price radar telemetry." 
                  : "Create a unique cryptographic profile to start intercepting market data."
                }
              </p>
            </div>

            {/* Decorative Liquid Shape in background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
               <div className="w-[140%] h-[140%] border border-white rounded-[30%_70%_70%_30%/30%_30%_70%_70%] animate-[spin_20s_linear_infinite]" />
            </div>
          </div>
        </div>

      
      </div>
    </div>
  );
}