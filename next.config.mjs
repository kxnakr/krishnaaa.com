/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
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
