import type { NextConfig } from "next";

// GitHub Actions (configure-pages) задаёт NEXT_PUBLIC_BASE_PATH = /имя-репо
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  // Статический экспорт — нужен для GitHub Pages (без Node-сервера).
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  ...(basePath
    ? { basePath, assetPrefix: basePath }
    : {}),
};

export default nextConfig;
