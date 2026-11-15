import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { proxy } from "./proxy";

describe("maintenance proxy", () => {
  it.each(["/personal-trainer", "/lp/personal-trainer", "/termos", "/privacidade"])(
    "rewrites %s to the maintenance page",
    (pathname) => {
      const response = proxy(new NextRequest(`https://croniu.com.br${pathname}`));

      expect(response.headers.get("x-middleware-rewrite")).toBe("https://croniu.com.br/");
    },
  );
});
