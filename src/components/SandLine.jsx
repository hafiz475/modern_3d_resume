import React from "react";

/*
  SandLine: a stylized white separator line (sand) across the bottom and a small top-right accent.
*/
export default function SandLine() {
  return (
    <>
      <svg className="sand-svg" viewBox="0 0 1400 160" preserveAspectRatio="none">
        <defs>
          <linearGradient id="sandGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#f2d7a0" />
            <stop offset="50%" stopColor="#e8c68a" />
            <stop offset="100%" stopColor="#f7e8c2" />
          </linearGradient>
        </defs>

        <path d="M0,20 C220,0 360,60 700,40 C1040,20 1200,10 1400,30 L1400,160 L0,160 Z"
              fill="url(#sandGrad)" opacity="0.98" />
        {/* white thin separator at the top-right end */}
        <line x1="1180" y1="10" x2="1390" y2="10" stroke="white" strokeWidth="2" strokeOpacity="0.85" />
      </svg>
    </>
  );
}
