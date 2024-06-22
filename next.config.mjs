/** @type {import('next').NextConfig} */
const nextConfig = {
  // @svgr/webpack 설정
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
