import { ImageResponse } from "next/og";
import { planets } from "@/lib/planets";
import { site } from "@/lib/site";

export const alt = `${planets.home.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const stars = [
  { left: 70, top: 52, size: 3, color: "#ffffff" },
  { left: 180, top: 96, size: 2, color: "#4bd5ee" },
  { left: 310, top: 40, size: 2, color: "#ffffff" },
  { left: 460, top: 78, size: 3, color: "#ffffff" },
  { left: 620, top: 36, size: 2, color: "#4bd5ee" },
  { left: 780, top: 88, size: 2, color: "#ffffff" },
  { left: 940, top: 48, size: 3, color: "#ffffff" },
  { left: 1080, top: 110, size: 2, color: "#4bd5ee" },
  { left: 140, top: 520, size: 2, color: "#ffffff" },
  { left: 280, top: 560, size: 3, color: "#4bd5ee" },
  { left: 520, top: 540, size: 2, color: "#ffffff" },
  { left: 760, top: 572, size: 2, color: "#ffffff" },
  { left: 980, top: 530, size: 3, color: "#4bd5ee" },
  { left: 1120, top: 490, size: 2, color: "#ffffff" },
  { left: 40, top: 280, size: 2, color: "#ffffff" },
  { left: 1148, top: 260, size: 2, color: "#4bd5ee" },
] as const;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(ellipse at 50% 42%, rgba(75, 213, 238, 0.16), transparent 55%), radial-gradient(ellipse at 12% 0%, rgba(245, 197, 24, 0.16), transparent 46%)",
          position: "relative",
        }}
      >
        {stars.map((star) => (
          <div
            key={`${star.left}-${star.top}`}
            style={{
              position: "absolute",
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              borderRadius: 999,
              backgroundColor: star.color,
              opacity: 0.85,
            }}
          />
        ))}
        <div
          style={{
            display: "flex",
            width: 96,
            height: 6,
            backgroundColor: "#f5c518",
            borderRadius: 4,
            marginBottom: 28,
          }}
        />
        <div
          style={{
            color: "#4bd5ee",
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: 6,
            lineHeight: 1.05,
            textAlign: "center",
          }}
        >
          {planets.home.name}
        </div>
        <div
          style={{
            color: "#e8e6e3",
            fontSize: 32,
            marginTop: 22,
            letterSpacing: 1,
            textAlign: "center",
          }}
        >
          {site.title}
        </div>
        <div
          style={{
            color: "#8a8a8a",
            fontSize: 24,
            marginTop: 16,
            letterSpacing: 2,
            textAlign: "center",
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
