import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root. Without this, Turbopack walks up and finds the
    // lockfile in the home directory and warns about the wider scope.
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
