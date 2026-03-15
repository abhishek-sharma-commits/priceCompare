import { Github, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-20 w-full border-t border-white/10  backdrop-blur-md py-12">
      {" "}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
                <div>
                    <video src="./src/assets/logo.mp4" autoPlay muted loop className=" rounded-xl h-8 object-contain" />     
                </div>
              <span className="text-xl font-semibold font-display text-white tracking-tighter ">
                Price<span className="text-gray-400">Radar</span>
              </span>
            </div>
            <p className="text-gray-500 text-xs font-mono max-w-xs">
              Autonomous price intelligence engine. Built for the modern
              consumer.
            </p>
          </div>

          <div className="flex gap-12">
            <div className="space-y-4">
              <h5 className="text-white text-[10px] font-black uppercase tracking-[0.2em]">
                Network
              </h5>
              <div className="flex flex-col gap-2 text-[#6b6b8a] text-xs font-mono">
                <a href="#" className="hover:text-[#FF9900] transition-colors">
                  Amazon API
                </a>
                <a href="#" className="hover:text-[#2874F0] transition-colors">
                  Flipkart Sync
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h5 className="text-white text-[10px] font-black uppercase tracking-[0.2em]">
                Connect
              </h5>
              <div className="flex gap-4 text-[#6b6b8a]">
                <Github size={18} className="hover:text-white cursor-pointer" />
                <Twitter
                  size={18}
                  className="hover:text-white cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.15em]">
            ©2026 PRICERADAR_SYSTEMS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 text-[10px] font-mono text-gray-500 uppercase tracking-[0.15em] uppercase">
            <span className="hover:text-white cursor-pointer transition-colors">
              Privacy-Protocol
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Terms-of-Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
