import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@skillhub/database"],
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
};

export default nextConfig;
