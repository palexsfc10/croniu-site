import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE_URL = process.env.VISUAL_CHECK_URL ?? "http://localhost:3001";
const OUTPUT_DIR = path.resolve(process.cwd(), "scripts/screenshots");
const VIEWPORTS = [360, 390, 768, 1024, 1440];
const PAGES = ["/", "/privacidade", "/termos"];

async function checkPage(browser, pagePath, width) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${BASE_URL}${pagePath}`, { waitUntil: "networkidle" });

  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));

  const slug = pagePath === "/" ? "home" : pagePath.replace(/\//g, "");
  const fileName = `${slug}-${width}.png`;
  await page.screenshot({ path: path.join(OUTPUT_DIR, fileName), fullPage: true });

  await context.close();

  return { pagePath, width, scrollWidth, clientWidth, overflow: scrollWidth > clientWidth };
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const browser = await chromium.launch();

  const results = [];
  for (const pagePath of PAGES) {
    for (const width of VIEWPORTS) {
      results.push(await checkPage(browser, pagePath, width));
    }
  }

  await browser.close();

  console.log("\nVisual check results (scrollWidth vs clientWidth):\n");
  for (const result of results) {
    const status = result.overflow ? "OVERFLOW" : "ok";
    console.log(
      `${status.padEnd(8)} ${result.pagePath.padEnd(14)} ${String(result.width).padEnd(6)} scrollWidth=${result.scrollWidth} clientWidth=${result.clientWidth}`,
    );
  }

  const overflowing = results.filter((result) => result.overflow);
  if (overflowing.length > 0) {
    console.error(`\n${overflowing.length} viewport(s) with horizontal overflow.`);
    process.exitCode = 1;
  } else {
    console.log("\nNo horizontal overflow detected at any checked viewport.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
