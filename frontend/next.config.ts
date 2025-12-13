import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "ui-avatars.com",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
