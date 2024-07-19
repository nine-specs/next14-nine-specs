/** @type {import('next').NextConfig} */
const nextConfig = {
  // 캐싱 로그 확인
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // 정의되지 않은 URL에 호스트 이름을 사용하는 src 값을 전달할 때 설정
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgnews.pstatic.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ssl.pstatic.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "k.kakaocdn.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
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
