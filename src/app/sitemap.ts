import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${siteConfig.siteUrl}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.siteUrl}/privacidade`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.siteUrl}/termos`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
