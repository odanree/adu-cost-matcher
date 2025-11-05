/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  // Performance optimizations
  compress: true, // Enable gzip compression
  swcMinify: true, // Use SWC for faster minification
  images: {
    formats: ['image/avif', 'image/webp'], // Modern image formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable static optimization
  staticPageGenerationTimeout: 60,
  // Bundle analysis (can be enabled with ANALYZE=true npm run build)
  productionBrowserSourceMaps: false, // Disable source maps in production for smaller bundle
};

export default nextConfig;
