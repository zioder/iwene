/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iwene.com.tn",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
