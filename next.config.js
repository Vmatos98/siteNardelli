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
    ],
  },
  env: {
    NEXT_PUBLIC_WHATSAPP_COMERCIAL: process.env.WHATSAPP_COMERCIAL,
    NEXT_PUBLIC_WHATSAPP_FINANCEIRO: process.env.WHATSAPP_FINANCEIRO,
  },
}

module.exports = nextConfig