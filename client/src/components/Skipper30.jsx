"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const images = [
  "https://i.pinimg.com/1200x/48/d9/34/48d934a06247fefbedec45720bffdef2.jpg",
  "https://i.pinimg.com/736x/19/28/7c/19287c8799f8c0ce38103cfe7a240bea.jpg",
  "https://i.pinimg.com/736x/e4/b0/1e/e4b01ea12c2e6f94763cb75861c87fcb.jpg",
  "https://i.pinimg.com/736x/55/44/e8/5544e8f312ce69f326268ea140121b0c.jpg",
  "https://i.pinimg.com/736x/07/fa/e2/07fae23a7aa3c7e87a02ac52ae8c638e.jpg",
  "https://i.pinimg.com/1200x/bf/38/3f/bf383f68b492604d21f0f4cef1946fe3.jpg",
  "https://i.pinimg.com/1200x/46/ae/16/46ae164fd6b704b86780a6b3c22de993.jpg",
  "https://i.pinimg.com/736x/61/d6/7c/61d67cb6a42d1d320a428bcd3eda1f57.jpg",
  "https://i.pinimg.com/1200x/85/34/32/853432f6437a7ee05e80b2553ee3c980.jpg",
  "https://i.pinimg.com/1200x/48/d9/34/48d934a06247fefbedec45720bffdef2.jpg",
  "https://i.pinimg.com/736x/19/28/7c/19287c8799f8c0ce38103cfe7a240bea.jpg",
  "https://i.pinimg.com/736x/e4/b0/1e/e4b01ea12c2e6f94763cb75861c87fcb.jpg",
  "https://i.pinimg.com/736x/55/44/e8/5544e8f312ce69f326268ea140121b0c.jpg",
  "https://i.pinimg.com/736x/07/fa/e2/07fae23a7aa3c7e87a02ac52ae8c638e.jpg",
  "https://i.pinimg.com/1200x/bf/38/3f/bf383f68b492604d21f0f4cef1946fe3.jpg",
  "https://i.pinimg.com/1200x/46/ae/16/46ae164fd6b704b86780a6b3c22de993.jpg",
  "https://i.pinimg.com/736x/61/d6/7c/61d67cb6a42d1d320a428bcd3eda1f57.jpg",
  "https://i.pinimg.com/1200x/85/34/32/853432f6437a7ee05e80b2553ee3c980.jpg",
];

const Column = ({ images, y, className }) => {
  return (
    <motion.div
      className={`relative flex h-full w-full md:w-1/4 flex-col gap-[2vw] ${className}`}
      style={{ y }}
    >
      {images.map((src, i) => (
        <div key={i} className="group relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/5">
          {/* Product Label Overlay */}
          <div className="absolute inset-0 z-10 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/80 via-transparent to-transparent">
             <span className="text-[10px] font-mono text-indigo-400 tracking-widest uppercase">Analysis_Active</span>
          </div>
          
          <img
            src={src}
            alt="gallery item"
            className="h-full w-full object-cover group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
          />
        </div>
      ))}
    </motion.div>
  );
};

const Skiper30 = () => {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  
  // Refined Parallax Speeds (more subtle for a premium feel)
  const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 0.8]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 1.4]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 0.5]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 1.1]);

  useEffect(() => {
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="w-full  py-32 relative overflow-hidden">
      {/* Background Decorative Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Intro Section */}
      <div className="max-w-7xl mx-auto px-6 mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="grid gap-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-indigo-400 font-bold">
            05 // Visual Inventory
          </span>
          <h2 className="text-5xl md:text-7xl font-medium tracking-tighter text-black leading-none">
            Marketplace <br />
            <span className="italic text-gray-500 text-4xl md:text-6xl font-light">Surveillance</span>
          </h2>
        </div>
        <p className="text-gray-500 text-xs font-mono max-w-[280px] leading-relaxed uppercase tracking-wider">
          Tracking 4.2M+ product variants across secondary and primary marketplaces in real-time.
        </p>
      </div>

      {/* Parallax Gallery */}
      <div
        ref={gallery}
        className="relative flex h-[150vh] gap-[2vw] overflow-hidden p-[2vw] opacity-80 hover:opacity-100 transition-opacity duration-1000"
      >
        <Column images={[images[0], images[1], images[2]]} y={y1} className="-top-[10%]" />
        <Column images={[images[3], images[4], images[5]]} y={y2} className="-top-[30%]" />
        <Column images={[images[6], images[7], images[8]]} y={y3} className="-top-[10%]" />
        <Column images={[images[0], images[4], images[2]]} y={y4} className="-top-[25%]" />
      </div>
    </div>
  );
};

export default Skiper30;