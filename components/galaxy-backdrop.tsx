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
      <div className="absolute right-[4%] top-[6%] h-14 w-14 rounded-full bg-[#5a7080]/35 opacity-55 shadow-[0_0_24px_rgba(90,112,128,0.25)]" />
      <div className="absolute bottom-[8%] left-[3%] h-10 w-10 rounded-full bg-[#8a5a48]/40 opacity-50 shadow-[0_0_18px_rgba(120,80,65,0.25)]" />

      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
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
