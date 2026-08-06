export const ogImageSize = { width: 1200, height: 630 };

export function OgImageMarkup({ subtitle }: { subtitle: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 28,
        padding: "80px 96px",
        background: "linear-gradient(135deg, #152033 0%, #2f3f8f 100%)",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", fontSize: 96, fontWeight: 700 }}>
        <span>Cron</span>
        <span style={{ color: "#9da5ef" }}>iu</span>
      </div>
      <div style={{ display: "flex", fontSize: 34, maxWidth: 880, color: "#e0e3fb", fontWeight: 500 }}>
        {subtitle}
      </div>
    </div>
  );
}
