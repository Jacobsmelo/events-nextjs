import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   cacheComponents: true,
   partialPrefetching: true,
   turbopack: {
      root: process.cwd(),
   },
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
         },
      ]
   },

   skipTrailingSlashRedirect: true,
   
   
   
   experimental: {
      turbopackFileSystemCacheForDev: true,
   }
};

export default nextConfig;
