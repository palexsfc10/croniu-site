import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  images: {
    // 92 is the only quality value used in the app (LP screenshots via
    // ProductScreenshot) — Next.js silently clamps any value not in this
    // allowlist to its nearest entry, so an unconfigured default of 75
    // would otherwise override the explicit `quality={92}` prop.
    qualities: [92],
  },
  async redirects() {
    return [
      {
        source: "/lp/personal-trainer",
        destination: "/personal-trainer",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
