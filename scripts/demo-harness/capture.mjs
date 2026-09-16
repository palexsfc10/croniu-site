/**
 * Captura as telas do demo a partir do PRODUTO REAL rodando contra a API
 * falsa deste harness. Ver README.md ao lado para o passo a passo.
 */
import { chromium } from "@playwright/test";

const APP = process.env.DEMO_APP_URL ?? "http://127.0.0.1:3000";
const OUT = "public/images/demo";

/** O indicador de dev do Next não pode aparecer em material de marketing. */
const hideDevOverlay = () => {
  const apply = () => {
    const style = document.createElement("style");
    style.textContent = "nextjs-portal,[data-next-badge-root]{display:none!important}";
    document.head?.appendChild(style);
  };
  if (document.head) apply();
  else document.addEventListener("DOMContentLoaded", apply);
};

const browser = await chromium.launch({
  ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
});

// Desktop a 1512x900 com DPR 2: fonte de 3024x1800, nítida no palco do site.
const desktop = await browser.newContext({
  viewport: { width: 1512, height: 900 },
  deviceScaleFactor: 2,
});
await desktop.addInitScript(hideDevOverlay);
const page = await desktop.newPage();

const SCREENS = [
  { path: "/app", name: "inicio" },
  { path: "/app/agenda", name: "agenda" },
  { path: "/app/clients", name: "clientes" },
  // A tela de ciclos abre em "Exige atenção", que está vazia nos dados de
  // demonstração — a aba com conteúdo é a que vale como vitrine.
  { path: "/app/cycles", name: "ciclos", tab: "Em andamento" },
  { path: "/app/receivables", name: "financeiro" },
];

for (const screen of SCREENS) {
  await page.goto(`${APP}${screen.path}`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3800);
  if (screen.tab) {
    await page.getByRole("tab", { name: screen.tab }).click();
    await page.waitForTimeout(1800);
  }
  await page.screenshot({ path: `${OUT}/${screen.name}.png` });
  console.log(`capturado ${screen.name}`);
}
await desktop.close();

const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
});
await mobile.addInitScript(hideDevOverlay);
const mpage = await mobile.newPage();
await mpage.goto(`${APP}/app/assistant`, { waitUntil: "domcontentloaded" });
await mpage.waitForTimeout(4000);
await mpage.screenshot({ path: `${OUT}/cronia-mobile.png` });
console.log("capturado cronia-mobile");

await mobile.close();
await browser.close();
