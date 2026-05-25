import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    remotePatterns: [new URL("https://images.unsplash.com")],
    // domains: ["adron.microf10.sg-host.com", "adrons.com"],
  },
};

export default nextConfig;
