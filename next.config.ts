import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack alias for @react-pdf/renderer canvas dependency
  turbopack: {
    resolveAlias: {
      canvas: { browser: './empty-module.js' },
    },
  },
  webpack: (config) => {
    config.resolve.alias = { ...config.resolve.alias, canvas: false };
    return config;
  },
};

export default nextConfig;
