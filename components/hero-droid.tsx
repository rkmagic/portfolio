export function HeroDroid({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <g className="motion-safe:animate-droid-bob">
        <ellipse
          cx="70"
          cy="166"
          rx="28"
          ry="5"
          fill="var(--crawl-blue)"
          opacity="0.22"
        />

        <g
          className="motion-safe:animate-droid-antenna"
          style={{ transformOrigin: "86px 52px" }}
        >
          <line
            x1="86"
            y1="52"
            x2="98"
            y2="14"
            stroke="#8a8a8a"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="99" cy="12" r="3.4" fill="var(--star-yellow)" />
          <circle cx="99" cy="12" r="1.4" fill="#fff4c2" />
        </g>

        <path
          d="M26 78 C26 52 44 42 70 42 C96 42 114 52 114 78 Z"
          fill="#c8c6c2"
        />
        <path
          d="M32 76 C34 56 48 48 70 48 C92 48 106 56 108 76"
          stroke="#9a9894"
          strokeWidth="1.2"
          fill="none"
        />
        <ellipse cx="70" cy="50" rx="16" ry="5" fill="#b0aeaa" />

        <circle
          className="motion-safe:animate-droid-eye"
          cx="54"
          cy="62"
          r="9"
          fill="#1a1a1a"
        />
        <circle
          className="motion-safe:animate-droid-eye"
          cx="54"
          cy="62"
          r="5.5"
          fill="var(--crawl-blue)"
        />
        <circle cx="52" cy="60" r="1.8" fill="#e8fbff" />

        <rect
          x="78"
          y="56"
          width="18"
          height="10"
          rx="2"
          fill="var(--star-yellow)"
        />
        <rect x="81" y="59" width="5" height="4" rx="0.6" fill="#1a1a1a" />
        <rect x="88" y="59" width="5" height="4" rx="0.6" fill="#1a1a1a" />

        <rect x="24" y="76" width="92" height="8" rx="2" fill="#6b6b6b" />
        <rect
          x="28"
          y="78"
          width="84"
          height="3"
          rx="1"
          fill="var(--star-yellow)"
        />

        <rect x="22" y="84" width="96" height="62" rx="10" fill="#b8b6b2" />
        <rect x="26" y="88" width="88" height="54" rx="8" fill="#9c9a96" />

        <rect
          x="34"
          y="96"
          width="28"
          height="22"
          rx="3"
          fill="var(--star-yellow)"
        />
        <line
          x1="38"
          y1="102"
          x2="58"
          y2="102"
          stroke="#1a1a1a"
          strokeWidth="1.4"
        />
        <line
          x1="38"
          y1="107"
          x2="58"
          y2="107"
          stroke="#1a1a1a"
          strokeWidth="1.4"
        />
        <line
          x1="38"
          y1="112"
          x2="58"
          y2="112"
          stroke="#1a1a1a"
          strokeWidth="1.4"
        />

        <rect x="70" y="96" width="36" height="38" rx="3" fill="#7a7874" />
        <rect x="74" y="100" width="28" height="6" rx="1" fill="#c8c6c2" />
        <rect
          x="74"
          y="110"
          width="12"
          height="8"
          rx="1"
          fill="var(--star-yellow)"
        />
        <rect x="90" y="110" width="12" height="8" rx="1" fill="#5c5c5c" />
        <circle cx="88" cy="126" r="4" fill="#5c5c5c" />
        <circle cx="88" cy="126" r="1.6" fill="var(--crawl-blue)" />

        <path
          d="M30 146 L36 158 H104 L110 146 Z"
          fill="#6b6b6b"
        />
        <path
          d="M40 150 H100"
          stroke="var(--star-yellow)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
