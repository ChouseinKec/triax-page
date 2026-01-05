import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: "export", // <- add this line to enable static export
};

export default nextConfig;