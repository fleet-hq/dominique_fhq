import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Vercel's image optimization quota was capping uploads — every
    // <Image src=...> routes through /_next/image and counts against
    // the project's monthly transformation limit (1000/Hobby, 5000/Pro).
    // Renter trip photos pushed us past it and Vercel started returning
    // HTTP 402 "OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED" → broken-image
    // icon in the UI. Serving raw URLs skips the meter entirely; the
    // visual loss (no AVIF/WebP, no responsive resizing) is acceptable
    // for a rental flow where photos load once during pickup/dropoff.
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fleethq-media.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'backend.fleethq.io',
      },
    ],
  },
  // Enable typed routes when all pages are created
  // experimental: {
  //   typedRoutes: true,
  // },
};

export default nextConfig;
