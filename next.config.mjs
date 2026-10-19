/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.130.1'],
  reactStrictMode: true,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap', 'lucide-react'],
  },
};

export default nextConfig;
