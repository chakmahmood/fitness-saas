import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@repo/domain",
    "@repo/application",
    "@repo/infrastructure",
  ],
};

export default nextConfig;
