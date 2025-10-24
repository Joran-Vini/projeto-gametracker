/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.rawg.io', // O domínio de onde vêm as imagens
        port: '',
        pathname: '/media/**', // Permite qualquer caminho dentro de /media/
      },
    ],
  },
};

export default nextConfig;
