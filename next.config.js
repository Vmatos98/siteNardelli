/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nardelliusinagem.com',
        port: '',
        pathname: '/web/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.google.com',
        port: '',
        pathname: '/**',
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
}

module.exports = nextConfig