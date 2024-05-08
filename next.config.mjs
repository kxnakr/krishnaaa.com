/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/krishna8421",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
