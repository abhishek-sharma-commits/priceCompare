import React, { useRef } from "react";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Crosshair from "../reactBits/Crosshair";
import ImageTrail from "../reactBits/ImageTrail";

const PageNotFound = () => {
  const trailImages = Array(12).fill(
    "https://i.pinimg.com/1200x/78/5d/c2/785dc2e3dbad00e7096c0279e95daff3.jpg"
  );
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#f0f0f0] flex items-center justify-center overflow-hidden font-sans select-none"
    >
      <div className="relative w-full h-screen cursor-none flex items-center justify-center">
        
        <ImageTrail key="not-found" items={trailImages} variant="10" />
        
        {/* <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <DotLottieReact 
            // Replace with your actual file path or a valid URL like this one:
            src="https://lottie.host/85539569-8086-4903-a20c-b26a6321287e/mCNoKAt3qY.lottie" 
            loop 
            autoplay 
          />
        </div> */}

        {/* <Crosshair
          containerRef={containerRef}
          color="#000000"
          targeted={true}
        /> */}

        {/* 4. Text Content Layer */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15vw] font-black tracking-tighter leading-none text-black mix-blend-exclusion select-none uppercase"
          >
            OH NO!
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 flex flex-col items-center gap-2 text-center"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1px] w-12 bg-black/20" />
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-black/40">
                Error_Code: 404
              </p>
              <span className="h-[1px] w-12 bg-black/20" />
            </div>

            <p className="text-sm md:text-base font-medium text-black">
              The coordinate you're seeking has drifted off-radar.
            </p>
          </motion.div>
        </div>

        {/* 5. UI Elements (Highest Z-index) */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto"
          // whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a
            href="/"
            className="relative group flex items-center justify-center px-12 py-4 rounded-full bg-black text-white transition-all duration-500 overflow-hidden"
          >
             <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative text-[10px] font-bold uppercase tracking-[0.4em]">
              Return Home
            </span>
          </a>
        </motion.div>

        {/* System Labels */}
        <div className="absolute top-8 left-8 text-[9px] font-mono text-black/20 uppercase tracking-widest hidden md:block">
          PR_SYSTEM_INDEX // 04
        </div>
        <div className="absolute top-8 right-8 text-[9px] font-mono text-black/20 uppercase tracking-widest hidden md:block">
          STATUS: SIGNAL_LOST
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;