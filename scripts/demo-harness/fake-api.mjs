/**
 * API falsa para rodar o FRONT-END REAL do Croniu sem backend.
 * Registra toda rota pedida (para descobrir o contrato empiricamente) e
 * responde com dados fictícios. Nenhum dado real de cliente aparece aqui.
 */
import { createServer } from "node:http";
import { appendFileSync } from "node:fs";

const LOG = "/home/user/demo-harness/requests.log";
const routes = new Map();
export function route(method, pattern, handler) {
  routes.set(`${method} ${pattern}`, handler);
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  const key = `${req.method} ${url.pathname}`;
  appendFileSync(LOG, `${key}${url.search}\n`);

  res.setHeader("content-type", "application/json");
  res.setHeader("access-control-allow-origin", "*");
  res.setHeader("access-control-allow-credentials", "true");
  if (req.method === "OPTIONS") return res.writeHead(204).end();

  for (const [k, handler] of routes) {
    const [m, pattern] = k.split(" ");
    if (m !== req.method) continue;
    const rx = new RegExp("^" + pattern.replace(/:[a-zA-Z]+/g, "([^/]+)") + "$");
    const match = url.pathname.match(rx);
    if (match) {
      const body = await handler(match.slice(1), url);
      return res.writeHead(200).end(JSON.stringify(body));
    }
  }
  res.writeHead(404).end(JSON.stringify({ code: "not_found", message: key }));
});

await import("./fixtures.mjs").then((m) => m.register(route));
server.listen(8010, "127.0.0.1", () => console.log("fake api em :8010"));
