/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  // Las paginas separadas ahora son secciones de la home. Se conservan las URLs antiguas.
  async redirects() {
    return [
      { source: "/Experiencia", destination: "/#career", permanent: true },
      { source: "/portafolio", destination: "/#work", permanent: true },
      { source: "/contacto", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
