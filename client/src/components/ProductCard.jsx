import { motion } from "framer-motion";
import {
  Star,
  Truck,
  Package,
  ExternalLink,
  CheckCircle,
  XCircle,
  Zap,
} from "lucide-react";

function StarRating({ rating }) {
  const num = parseFloat(rating);
  if (isNaN(num)) return null;
  return (
    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-400 text-[11px] font-mono font-bold border border-amber-400/20">
      <Star size={10} fill="currentColor" />
      {num.toFixed(1)}
    </span>
  );
}

export default function ProductCard({ product, source, index }) {
  const isAmazon = source === "amazon";
  const accentColor = isAmazon ? "#FF9900" : "#2874F0";
  const glowClass = isAmazon ? "amazon-glow" : "flipkart-glow";

  const hasDiscount =
    product.discount && product.discount !== product.originalPrice;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`relative group bg-[#0f0f1a]/40 backdrop-blur-xl rounded-2xl p-5 flex flex-col gap-5 border border-white/5 hover:border-white/20 transition-all duration-500 cursor-default ${glowClass}`}
    >
      {/* Background Decorative Element */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 opacity-[0.03] pointer-events-none rounded-tr-2xl overflow-hidden"
        style={{ background: `radial-gradient(circle at top right, ${accentColor}, transparent)` }}
      />

      {/* Main Info Section */}
      <div className="flex gap-5">
        {/* Image Container with Blend Mode */}
        <div className="relative w-24 h-24 flex-shrink-0 rounded-2xl bg-white p-2.5 shadow-2xl overflow-hidden group-hover:scale-[1.03] transition-transform duration-500">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply"
              onError={(e) => { e.target.style.display = "none"; }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-50">
               <Package size={28} className="text-slate-300" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <h3 className="text-[13px] md:text-sm font-semibold text-white/90 line-clamp-2 leading-tight font-display group-hover:text-white transition-colors">
            {product.name || "Unknown Product"}
          </h3>
          
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-2xl font-black font-mono tracking-tighter" style={{ color: accentColor }}>
                {product.price || "—"}
              </span>
              {hasDiscount && (
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-white/40 line-through font-mono">
                    {product.originalPrice}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold border border-emerald-500/20">
                    {product.discount}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status Badges Row */}
      <div className="flex flex-wrap items-center gap-3">
        {product.rating && <StarRating rating={product.rating} />}
        
        {product.reviewCount && (
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
            {product.reviewCount} verified reviews
          </span>
        )}
        
        {product.availability && (
          <div className={`ml-auto flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border ${
            product.availability.toLowerCase().includes("in stock")
              ? "text-emerald-400 bg-emerald-400/5 border-emerald-400/10"
              : "text-red-400 bg-red-400/5 border-red-400/10"
          }`}>
            <span className={`w-1 h-1 rounded-full animate-pulse ${
              product.availability.toLowerCase().includes("in stock") ? "bg-emerald-400" : "bg-red-400"
            }`} />
            {product.availability}
          </div>
        )}
      </div>

      {/* Technical Specs HUD style */}
      {product.specs && product.specs.length > 0 && (
        <div className="bg-white/[0.2] rounded-xl p-3 border border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Zap size={10} style={{ color: accentColor }} />
            <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-white/90">Technical Parameters</p>
          </div>
          <ul className="grid grid-cols-1 gap-1.5">
            {product.specs.slice(0, 3).map((spec, i) => (
              <li key={i} className="flex items-center gap-2 text-[11px] text-white/60 truncate">
                <div className="w-1 h-1 rounded-full opacity-30" style={{ background: accentColor }} />
                {spec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer / CTA Section */}
      <div className="mt-auto flex flex-col gap-3">
        {product.deliveryInfo && (
          <div className="flex items-center gap-2.5 px-1">
            <Truck size={12} className="opacity-50" style={{ color: accentColor }} />
            <span className="text-[11px] text-[#fff] font-mono italic truncate">
              {product.deliveryInfo}
            </span>
          </div>
        )}

        {product.productUrl && (
          <a
            href={product.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 overflow-hidden"
            style={{
              background: `${accentColor}30`,
              color: accentColor,
              border: `1px solid ${accentColor}25`,
            }}
          >
            {/* Hover Reveal Effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: `linear-gradient(90deg, transparent, ${accentColor}15, transparent)` }}
            />
            
            View on {isAmazon ? "Amazon" : "Flipkart"}
            <ExternalLink size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>
        )}
      </div>
    </motion.div>
  );
}