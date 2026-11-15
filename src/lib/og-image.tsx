export const ogImageSize = { width: 1200, height: 630 };

export function OgImageMarkup() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 32,
        padding: "80px 96px",
        background: "#090909",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <div
          style={{
            width: 72,
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 36,
            background: "#ff5a1f",
            color: "#090909",
            fontSize: 40,
            fontWeight: 800,
          }}
        >
          C
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 18, fontSize: 80, fontWeight: 800, letterSpacing: -3 }}>
          <span>CRONIU</span>
          <span style={{ color: "#ff6b35", fontSize: 30, letterSpacing: 8 }}>LABS</span>
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 30, color: "#ff6b35", fontWeight: 700, letterSpacing: 7 }}>
        EM ATUALIZAÇÃO
      </div>
      <div style={{ display: "flex", fontSize: 48, maxWidth: 900, color: "#ffffff", fontWeight: 700, lineHeight: 1.1 }}>
        Estamos preparando uma nova experiência.
      </div>
    </div>
  );
}
