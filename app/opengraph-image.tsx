import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated Open Graph / Twitter card image. */
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
          padding: "80px",
          background: "linear-gradient(135deg, #12100D 0%, #1F1A14 60%, #2A2018 100%)",
          color: "#F0EBE3",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -120,
            width: 500,
            height: 500,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(232,168,124,0.35), transparent 70%)",
            display: "flex",
          }}
        />
        <div style={{ fontSize: 36, color: "#E8A87C", display: "flex" }}>
          {siteConfig.shortName}.
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 84,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: 950,
            display: "flex",
          }}
        >
          Digital experiences that move people.
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 28,
            color: "#A89F92",
            display: "flex",
          }}
        >
          Brand · Product · Web · Motion
        </div>
      </div>
    ),
    size
  );
}
