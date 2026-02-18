import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "nardelliusinagem.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "p1.pxfuel.com",
      },
      {
        protocol: "https",
        hostname: "www.rapiddirect.com",
      },
      {
        protocol: "https",
        hostname: "**.google.com",
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
      {
        protocol: 'https',
        hostname: '**.svc.ms', // Cobre southcentralus1-mediap.svc.ms e outros
      },
      {
        protocol: 'https',
        hostname: '**.microsoft.com',
      },
      {
        protocol: 'https',
        hostname: '**.onedrive.com',
      },
      {
        protocol: 'https',
        hostname: '**.sharepoint.com',
      },
      {
        protocol: 'https',
        hostname: 'graph.microsoft.com',
      },
      // Adicione este especificamente caso o wildcard falhe em algumas versões antigas
      {
        protocol: 'https',
        hostname: 'southcentralus1-mediap.svc.ms',
      }
    ],
  },
  env: {
    NEXT_PUBLIC_WHATSAPP_COMERCIAL: process.env.WHATSAPP_COMERCIAL,
    NEXT_PUBLIC_WHATSAPP_FINANCEIRO: process.env.WHATSAPP_FINANCEIRO,
  },
};

export default nextConfig;
