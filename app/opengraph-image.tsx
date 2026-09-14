import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.title} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(ellipse at 12% 0%, rgba(245, 197, 24, 0.2), transparent 52%), radial-gradient(ellipse at 100% 100%, rgba(75, 213, 238, 0.14), transparent 48%)",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 96,
            height: 6,
            backgroundColor: "#f5c518",
            borderRadius: 4,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#4bd5ee",
              fontSize: 26,
              letterSpacing: 3,
            }}
          >
            {site.tagline}
          </div>
          <div
            style={{
              color: "#e8e6e3",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              marginTop: 20,
              maxWidth: 1040,
            }}
          >
            {site.title}
          </div>
          <div
            style={{
              color: "#8a8a8a",
              fontSize: 30,
              lineHeight: 1.4,
              marginTop: 28,
              maxWidth: 980,
            }}
          >
            {site.description}
          </div>
        </div>
        <div
          style={{
            color: "#f5c518",
            fontSize: 24,
            letterSpacing: 1,
          }}
        >
          {site.headline}
        </div>
      </div>
    ),
    { ...size },
  );
}
