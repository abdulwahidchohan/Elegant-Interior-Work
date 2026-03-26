/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  serverExternalPackages: ["sharp", "plaiceholder"],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      three: "three",
    };
    return config;
  },
  turbopack: {
    resolveAlias: {
      three: "three",
    },
  },
};

export default nextConfig;
