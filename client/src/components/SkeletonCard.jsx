export default function SkeletonCard({ source }) {
  const accentColor = source === "amazon" ? "#FF9900" : "#2874F0";

  return (
    <div
      className="relative overflow-hidden bg-[#0f0f1a]/30 border border-white/5 backdrop-blur-md rounded-2xl p-4 flex flex-col gap-4"
    >
      {/* The Scanning Animation Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      </div>

      {/* Header: Platform Badge Skeleton */}
      <div className="flex justify-between items-center mb-1">
        <div className="h-4 w-16 rounded-md bg-white/5 border border-white/5" />
        <div className="h-3 w-12 rounded bg-white/5" />
      </div>

      <div className="flex gap-4">
        {/* Image Box Skeleton */}
        <div className="w-24 h-24 flex-shrink-0 rounded-xl bg-white/5" />

        <div className="flex-1 flex flex-col gap-3 pt-1">
          {/* Title Bars */}
          <div className="space-y-2">
            <div className="h-3 rounded bg-white/10 w-full" />
            <div className="h-3 rounded bg-white/10 w-4/5" />
          </div>
          
          {/* Price Bar */}
          <div className="h-6 rounded-lg bg-white/10 w-1/3 mt-1" />
          
          {/* Ratings Bar */}
          <div className="flex gap-2">
            <div className="h-3 rounded bg-white/5 w-8" />
            <div className="h-3 rounded bg-white/5 w-12" />
          </div>
        </div>
      </div>

      {/* Delivery HUD Skeleton */}
      <div className="h-10 rounded-xl bg-white/5 border border-white/5" />

      {/* Button Skeleton */}
      <div className="mt-auto h-10 rounded-xl bg-white/5" />
    </div>
  );
}