const FAR_STARS = [
  [6, 10, 1.2, 0.4],
  [14, 24, 0.9, 0.28],
  [22, 6, 1.35, 0.45],
  [31, 38, 0.8, 0.24],
  [39, 14, 1.1, 0.36],
  [48, 30, 0.9, 0.28],
  [57, 8, 1.4, 0.42],
  [66, 22, 0.85, 0.26],
  [74, 44, 1.15, 0.34],
  [83, 11, 1.0, 0.3],
  [91, 28, 0.9, 0.28],
  [10, 52, 1.0, 0.3],
  [18, 68, 1.3, 0.38],
  [27, 56, 0.8, 0.24],
  [36, 74, 1.1, 0.32],
  [45, 60, 0.9, 0.26],
  [54, 82, 1.25, 0.36],
  [63, 66, 0.85, 0.24],
  [72, 78, 1.05, 0.3],
  [81, 58, 0.9, 0.26],
  [94, 72, 1.15, 0.34],
  [4, 78, 0.95, 0.28],
  [50, 48, 0.7, 0.2],
  [88, 50, 0.85, 0.24],
] as const;

const SPARKLES = [
  { top: "8%", left: "27%", color: "rgba(214, 196, 120, 0.7)", delay: "0s" },
  { top: "35%", left: "85%", color: "rgba(140, 180, 190, 0.65)", delay: "1.2s" },
  { top: "87%", left: "41%", color: "rgba(214, 196, 120, 0.55)", delay: "2s" },
  { top: "39%", left: "7%", color: "rgba(200, 198, 194, 0.55)", delay: "0.6s" },
] as const;

export function GalaxyBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Nebula washes — muted */}
      <div className="absolute -left-20 -top-10 h-[28rem] w-[28rem] rounded-full bg-[#6a8a96] opacity-[0.06] blur-3xl" />
      <div className="absolute -right-24 top-24 h-[30rem] w-[30rem] rounded-full bg-[#8a8060] opacity-[0.05] blur-3xl" />
      <div className="absolute bottom-[-4rem] left-[20%] h-80 w-[36rem] rounded-full bg-[#5c5670] opacity-[0.05] blur-3xl" />

      {/* Soft milky-way band */}
      <div
        className="absolute left-[-10%] top-[18%] h-40 w-[120%] -rotate-[18deg] opacity-[0.12]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(120,150,160,0.18) 22%, rgba(200,198,194,0.2) 48%, rgba(160,145,90,0.12) 72%, transparent 100%)",
          filter: "blur(28px)",
        }}
      />
      <div
        className="absolute left-[-5%] top-[34%] h-16 w-[110%] -rotate-[18deg] opacity-[0.08]"
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, rgba(200,198,194,0.28) 50%, transparent 90%)",
          filter: "blur(14px)",
        }}
      />

      {/* Distant worlds */}
      <div className="absolute right-[4%] top-[6%] h-14 w-14 rounded-full bg-[#5a7080]/35 opacity-55 shadow-[0_0_24px_rgba(90,112,128,0.25)]">
        <span className="absolute left-1/2 top-1/2 h-[2px] w-[4.75rem] -translate-x-1/2 -translate-y-1/2 -rotate-[22deg] rounded-full bg-[#b8a86a]/40" />
      </div>
      <div className="absolute bottom-[8%] left-[3%] h-10 w-10 rounded-full bg-[#8a5a48]/40 opacity-50 shadow-[0_0_18px_rgba(120,80,65,0.25)]" />

      {/* Cross sparkles */}
      {SPARKLES.map((s) => (
        <span
          key={`${s.top}-${s.left}`}
          className="absolute h-3 w-3 motion-safe:animate-star-twinkle"
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        >
          <span
            className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 rounded-full"
            style={{ background: s.color, boxShadow: `0 0 6px ${s.color}` }}
          />
          <span
            className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 rounded-full"
            style={{ background: s.color, boxShadow: `0 0 6px ${s.color}` }}
          />
        </span>
      ))}

      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="#7a9aa4" strokeWidth={1} opacity={0.28} fill="none">
          <line x1="3%" y1="6%" x2="7%" y2="3%" />
          <line x1="7%" y1="3%" x2="11%" y2="7%" />
          <line x1="11%" y1="7%" x2="8%" y2="11%" />
          <line x1="78%" y1="20%" x2="84%" y2="16%" />
          <line x1="84%" y1="16%" x2="88%" y2="22%" />
        </g>
        {[
          [3, 6],
          [7, 3],
          [11, 7],
          [8, 11],
          [78, 20],
          [84, 16],
          [88, 22],
        ].map(([x, y], i) => (
          <circle
            key={`c-${i}`}
            cx={`${x}%`}
            cy={`${y}%`}
            r={1.7}
            fill="#8aa8b0"
            opacity={0.5}
          />
        ))}

        <g opacity={0.38}>
          <line
            x1="62%"
            y1="7%"
            x2="74%"
            y2="16%"
            stroke="#b8a86a"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
          <line
            x1="62%"
            y1="7%"
            x2="70%"
            y2="13%"
            stroke="#d4c9a0"
            strokeWidth={0.8}
            strokeLinecap="round"
            opacity={0.7}
          />
          <circle cx="74%" cy="16%" r={2} fill="#b8a86a" />
        </g>

        {FAR_STARS.map(([x, y, r, opacity], i) => (
          <g key={`s-${i}`}>
            <circle
              cx={`${x}%`}
              cy={`${y}%`}
              r={r * 2.6}
              fill="#c8c6c2"
              opacity={opacity * 0.16}
            />
            <circle
              cx={`${x}%`}
              cy={`${y}%`}
              r={r}
              fill="#c8c6c2"
              opacity={opacity}
              className={i % 4 === 0 ? "motion-safe:animate-star-twinkle" : undefined}
              style={
                i % 4 === 0
                  ? { animationDelay: `${(i % 6) * 0.8}s` }
                  : undefined
              }
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
