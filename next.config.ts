import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/seed/**', 
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/mrlokesh/**',
      }
    ]
  }
};

export default nextConfig;