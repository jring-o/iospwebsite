import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Rewrite /theory to serve the narrative from public/narrative
  async rewrites() {
    return [
      {
        source: '/theory',
        destination: '/narrative/index.html',
      },
      {
        source: '/theory/:path*',
        destination: '/narrative/:path*',
      },
    ];
  },
};

export default nextConfig;
