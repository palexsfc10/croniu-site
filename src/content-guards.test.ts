import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

/**
 * Croniu não monta nem prescreve treinos — essa promessa não pode vazar em
 * nenhuma fixture ou componente de marketing (site institucional +
 * /personal-trainer). Este teste falha o build se a palavra "treino"
 * reaparecer em qualquer um desses lugares, incluindo comentários de código
 * (uma peça de marketing pode ser montada copiando texto de um comentário
 * sem querer).
 */
const FORBIDDEN = /treino/i;

const ROOT = path.resolve(import.meta.dirname, "..");

function collectFiles(dir: string, exts: string[]): string[] {
  const entries = readdirSync(dir);
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      files.push(...collectFiles(full, exts));
    } else if (exts.includes(path.extname(entry)) && !entry.includes(".test.")) {
      files.push(full);
    }
  }
  return files;
}

function assertNoForbiddenWord(files: string[]) {
  for (const file of files) {
    const content = readFileSync(file, "utf8");
    expect(content, `${path.relative(ROOT, file)} não deve mencionar "treino"`).not.toMatch(FORBIDDEN);
  }
}

describe("sem menção a treino/prescrição de treino", () => {
  it("scripts/demo-harness/fixtures.mjs (dados de demonstração)", () => {
    const fixturesPath = path.join(ROOT, "scripts/demo-harness/fixtures.mjs");
    assertNoForbiddenWord([fixturesPath]);
  });

  it("páginas do site (src/app)", () => {
    const files = collectFiles(path.join(ROOT, "src/app"), [".ts", ".tsx"]);
    expect(files.length).toBeGreaterThan(0);
    assertNoForbiddenWord(files);
  });

  it("componentes de marketing (src/components/landing e src/components/lp-google-ads)", () => {
    const files = [
      ...collectFiles(path.join(ROOT, "src/components/landing"), [".ts", ".tsx"]),
      ...collectFiles(path.join(ROOT, "src/components/lp-google-ads"), [".ts", ".tsx"]),
    ];
    expect(files.length).toBeGreaterThan(0);
    assertNoForbiddenWord(files);
  });
});
