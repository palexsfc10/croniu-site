/**
 * Grava o vídeo de demonstração navegando pelo PRODUTO REAL.
 * Saída: .webm em scripts/demo-harness/output/. Ver README.md ao lado.
 */
import { chromium } from "@playwright/test";

const APP = process.env.DEMO_APP_URL ?? "http://127.0.0.1:3000";
const OUT = "scripts/demo-harness/output";

const browser = await chromium.launch({
  ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
});
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 810 },
  recordVideo: { dir: OUT, size: { width: 1440, height: 810 } },
});

// Injetado em TODA navegação: o Playwright não desenha o ponteiro no vídeo, e
// sem um cursor visível a navegação parece acontecer sozinha. Montar via
// addInitScript evita que ele suma a cada troca de página.
await ctx.addInitScript(() => {
  const install = () => {
    const style = document.createElement("style");
    style.textContent = `nextjs-portal,[data-next-badge-root]{display:none!important}
      #demo-cursor{position:fixed;z-index:2147483647;width:22px;height:22px;margin:-11px 0 0 -11px;
        border-radius:999px;pointer-events:none;background:rgba(79,87,216,.28);border:2px solid #4f57d8;
        transition:transform .8s cubic-bezier(.22,1,.36,1);transform:translate(150px,430px)}
      #demo-cursor.click{animation:demo-click .45s ease-out}
      @keyframes demo-click{0%{box-shadow:0 0 0 0 rgba(79,87,216,.45)}100%{box-shadow:0 0 0 24px rgba(79,87,216,0)}}`;
    document.head?.appendChild(style);
    const cursor = document.createElement("div");
    cursor.id = "demo-cursor";
    document.body?.appendChild(cursor);
  };
  if (document.body) install();
  else document.addEventListener("DOMContentLoaded", install);
});

const page = await ctx.newPage();

async function step(locator, dwell) {
  await locator.waitFor({ timeout: 15_000 });
  const box = await locator.boundingBox();
  if (box) {
    await page.evaluate(
      ([x, y]) => {
        const cursor = document.getElementById("demo-cursor");
        if (cursor) cursor.style.transform = `translate(${x}px, ${y}px)`;
      },
      [box.x + box.width / 2, box.y + box.height / 2],
    );
    await page.waitForTimeout(950);
    await page.evaluate(() => document.getElementById("demo-cursor")?.classList.add("click"));
    await page.waitForTimeout(380);
  }
  await locator.click();
  await page.waitForTimeout(dwell);
}

const nav = (href) => page.locator(`nav a[href="${href}"]`).first();

try {
  await page.goto(`${APP}/app`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(4200);
  await step(nav("/app/agenda"), 3600);
  await step(nav("/app/clients"), 3400);
  await step(nav("/app/cycles"), 1800);
  await step(page.getByRole("tab", { name: "Em andamento" }), 3600);
  await step(nav("/app/receivables"), 3600);
  // A Cronia só é alcançável a partir do Início — volta e entra por lá.
  await step(nav("/app"), 2400);
  await step(page.locator('a[href^="/app/assistant"]').first(), 4200);
} catch (error) {
  console.log("roteiro interrompido:", String(error).slice(0, 140));
} finally {
  // Fechar o contexto é o que finaliza o arquivo de vídeo — sem isso ele sai
  // truncado e sem duração.
  await ctx.close();
  await browser.close();
}
console.log(`vídeo em ${OUT}/`);
