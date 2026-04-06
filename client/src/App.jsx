import { useState, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { useNavigate } from "react-router-dom";

// Components
import Header from "./components/Header";
import Hero from "./components/Hero";
import ResultsGrid from "./components/ResultsGrid";
import SuggestedSearches from "./components/SuggestedSearches";
import Dither from "./reactBits/Dither";
import Crosshair from "./reactBits/Crosshair";
import Skiper19 from "./components/Skipper19";

// Utils
import { searchProducts } from "./utils/api";
import About from "./pages/About";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import Footer from "./components/Footer";
import Skiper30 from "./components/Skipper30";
import FAQ from "./components/FAQ";
// import AgentPanel from "./AIchat/AgentPanel"; // ← AI Agent
import { useAuth } from "./auth/AuthContext";

const TOAST_STYLE = {
  background: "#0f0f1a",
  color: "#e8e8f0",
  border: "1px solid #1e1e2e",
  fontFamily: "DM Mono, monospace",
  fontSize: "12px",
};

export default function App() {
  const { isAuthed } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [activeQuery, setActiveQuery] = useState("");

  // Ref for Crosshair tracking
  const containerRef = useRef(null);

  const handleSearch = async (query) => {
    if (!query) return;
    if (!isAuthed) {
      toast.error("Please login to search products.", { style: TOAST_STYLE });
      navigate("/login", { state: { from: "/" } });
      return;
    }
    setLoading(true);
    setActiveQuery(query);
    setResults(null);

    const toastId = toast.loading(`Scanning Marketplaces for "${query}"…`, {
      style: TOAST_STYLE,
    });

    try {
      const { data } = await searchProducts(query);
      setResults(data);
      const total = (data.amazon?.length || 0) + (data.flipkart?.length || 0);
      toast.success(`Found ${total} products`, {
        id: toastId,
        style: TOAST_STYLE,
      });
    } catch (err) {
      const msg =
        err.response?.status === 401
          ? "Session expired. Please login again."
          : "Failed to fetch products.";
      toast.error(msg, {
        id: toastId,
        style: { ...TOAST_STYLE, border: "1px solid #3a1a1a" },
      });
      if (err.response?.status === 401)
        navigate("/login", { state: { from: "/" } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
      {/* Container Ref attached to the main wrapper */}
      <div
        ref={containerRef}
        className="min-h-screen bg-white hero-gradient relative isolate overflow-x-hidden"
      >
        {/* BACKGROUND LAYER: Dither & Crosshair */}
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
          {/* Dither needs pointer-events-auto internally to work, 
              ensure the Dither component itself doesn't block the UI */}
          <div className="absolute inset-0 pointer-events-auto">
            {/* <Dither
              waveColor={[0.5, 0.5, 0.5]}
              disableAnimation={false}
              enableMouseInteraction
              mouseRadius={0.2}
              colorNum={4}
              waveAmplitude={0.3}
              waveFrequency={3}
              waveSpeed={0.05}
            /> */}
            <Skiper19 />
          </div>

          <Crosshair
            containerRef={containerRef}
            color="#00000084"
            targeted={true}
          />
        </div>

        <Toaster position="top-right" />

        {/* FOREGROUND LAYER: Your actual UI */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />

          <main className="max-w-6xl mx-auto px-6 pb-20 w-full">
            <Hero onSearch={handleSearch} loading={loading} />

            <AnimatePresence mode="wait">
              {results || loading ? (
                <div className="mt-10 backdrop-blur-md bg-black/20 rounded-3xl border border-white/10 p-6">
                  <ResultsGrid
                    results={results}
                    loading={loading}
                    query={activeQuery}
                  />
                </div>
              ) : (
                <SuggestedSearches onSelect={handleSearch} />
              )}
            </AnimatePresence>
          </main>

          <section className="flex-grow">
            <About />
            <Skiper30 />
            <Services />

            <Testimonials />
            <FAQ />
          </section>

          <Footer />
        </div>
      </div>
    </ReactLenis>
  );
}
