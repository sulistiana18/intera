import type { NextConfig } from "next";

const basePath = "/intera";

const nextConfig: NextConfig = {
  output: "export",

  basePath,
  assetPrefix: basePath,

  images: {
    unoptimized: true,
  },

  trailingSlash: true,
};

export default nextConfig;