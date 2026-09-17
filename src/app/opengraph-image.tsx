import { ImageResponse } from "next/og";

export const alt = "Krishna Kumar’s personal website";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#f6f6f6",
        color: "#18181b",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 100,
      }}
    >
      <div style={{ fontSize: 24, color: "#71717a", marginBottom: 30 }}>
        krishnaaa.com
      </div>
      <div style={{ fontSize: 76, letterSpacing: -3 }}>Krishna Kumar</div>
      <div style={{ fontSize: 30, color: "#52525b", marginTop: 24 }}>
        software, writing, and experiments.
      </div>
    </div>,
    size,
  );
}
