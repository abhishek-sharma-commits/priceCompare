import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

// Components
import Header from "./components/Header";
import Hero from "./components/Hero";
import ResultsGrid from "./components/ResultsGrid";
import SuggestedSearches from "./components/SuggestedSearches";
import Dither from "./reactBits/Dither";

// Utils
import { searchProducts } from "./utils/api";
import About from "./pages/About";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import Footer from "./components/Footer";

const TOAST_STYLE = {
  background: "#0f0f1a",
  color: "#e8e8f0",
  border: "1px solid #1e1e2e",
  fontFamily: "DM Mono, monospace",
  fontSize: "12px",
};

export default function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [activeQuery, setActiveQuery] = useState("");

  const handleSearch = async (query) => {
    if (!query) return;
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
      toast.error("Failed to fetch products.", {
        id: toastId,
        style: { ...TOAST_STYLE, border: "1px solid #3a1a1a" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen hero-gradient relative">
      <div className="fixed inset-0 w-full h-full  pointer-events-auto">
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction
          mouseRadius={0.2}
          colorNum={4}
          waveAmplitude={0.3}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      </div>
      <Toaster position="top-right" />
      <Header />

      <main className="max-w-6xl mx-auto px-6 pb-20">
        <Hero onSearch={handleSearch} loading={loading} />

        <AnimatePresence mode="wait">
          {results || loading ? (
            <ResultsGrid
              results={results}
              loading={loading}
              query={activeQuery}
            />
          ) : (
            <SuggestedSearches onSelect={handleSearch} />
          )}
        </AnimatePresence>
      </main>

      <main className="flex-grow">
        <About />
        <Services />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
