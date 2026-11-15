import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#090909",
          borderRadius: 40,
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
          borderRadius: "50%",
          background: "#ff5a1f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#090909", fontFamily: "sans-serif", fontSize: 58, fontWeight: 800 }}>C</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
