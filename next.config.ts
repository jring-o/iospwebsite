import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Shareable short links that jump straight to the workshop programme
  async redirects() {
    return [
      {
        source: '/workshops',
        destination: '/#workshops',
        permanent: false,
      },
      {
        source: '/workshop',
        destination: '/#workshops',
        permanent: false,
      },
      // /workshops/<slug> lands on the homepage with that workshop's card
      // expanded and scrolled into view (handled by the Iosp2026 component).
      {
        source: '/workshops/:slug',
        destination: '/?ws=:slug',
        permanent: false,
      },
    ];
  },
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
