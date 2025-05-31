
import type {NextConfig} from 'next';
import withPWAInit from '@ducanh2912/next-pwa';

const REPO_NAME = 'spinner-tasker'; // ¡¡IMPORTANTE!! Cambia esto si el nombre de tu repositorio es diferente.

const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development for faster HMR
  // basePath: `/${REPO_NAME}`, // next-pwa maneja basePath automáticamente si está en NextConfig
};

const withPWA = withPWAInit(pwaConfig);

const nextConfig: NextConfig = {
  output: 'export', // Necesario para la exportación estática
  basePath: `/${REPO_NAME}`, // Para que las rutas funcionen en GH Pages (tu-usuario.github.io/REPO_NAME)
  assetPrefix: `/${REPO_NAME}/`, // Para que los assets se carguen desde la ruta correcta
  trailingSlash: true, // Ayuda con la compatibilidad de rutas en GH Pages
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // Para `next export` y `next/image` sin un loader personalizado
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withPWA(nextConfig);
