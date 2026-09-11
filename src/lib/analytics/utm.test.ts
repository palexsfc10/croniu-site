import { describe, expect, it } from "vitest";
import { appendTrackedParams, pickTrackedParams } from "./utm";

describe("pickTrackedParams", () => {
  it("keeps only the allowlisted campaign params", () => {
    const picked = pickTrackedParams(
      "?utm_source=instagram&utm_medium=social&next=/app&ref=abc123&gclid=xyz",
    );
    expect(picked).toEqual({ utm_source: "instagram", utm_medium: "social", gclid: "xyz" });
  });

  it("keeps fbclid alongside the other tracked params", () => {
    const picked = pickTrackedParams("?utm_source=facebook&fbclid=abc123");
    expect(picked).toEqual({ utm_source: "facebook", fbclid: "abc123" });
  });

  it("returns an empty object when there is nothing to track", () => {
    expect(pickTrackedParams("")).toEqual({});
    expect(pickTrackedParams("?foo=bar")).toEqual({});
  });
});

describe("appendTrackedParams", () => {
  it("appends tracked params to the target url", () => {
    const url = appendTrackedParams("https://app.croniu.com.br/register", {
      utm_source: "instagram",
      utm_campaign: "lancamento",
    });
    expect(url).toBe(
      "https://app.croniu.com.br/register?utm_source=instagram&utm_campaign=lancamento",
    );
  });

  it("appends fbclid to the app.croniu.com.br/register url", () => {
    const url = appendTrackedParams("https://app.croniu.com.br/register", {
      fbclid: "abc123",
    });
    expect(url).toBe("https://app.croniu.com.br/register?fbclid=abc123");
  });

  it("never overwrites a param already present on the destination url", () => {
    const url = appendTrackedParams("https://app.croniu.com.br/register?utm_source=parceiro", {
      utm_source: "instagram",
    });
    expect(url).toBe("https://app.croniu.com.br/register?utm_source=parceiro");
  });

  it("returns the url unchanged when there is nothing tracked", () => {
    const url = "https://app.croniu.com.br/register";
    expect(appendTrackedParams(url, {})).toBe(url);
  });
});
