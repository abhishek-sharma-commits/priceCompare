import React from "react";

export default function ParamRow({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[8px] font-mono uppercase tracking-widest text-white/25">
        {label}
      </span>
      <span className="text-[11px] font-mono text-white/70 truncate capitalize">
        {value || "—"}
      </span>
    </div>
  );
}
