/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/kxnakr",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
