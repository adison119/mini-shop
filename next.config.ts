import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.pixabay.com" },
      // เพิ่มโดเมนอื่นๆ ที่ใช้รูปภายนอก
    ],
  },
};

export default nextConfig;
