/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'comfyui-image.vercel.app',
        port: '',
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

// nextConfig.rewrites = async () => {
//     const ret = [
//         // adjust for previous version directly using "/api/proxy/" as proxy base route
//         {
//             // source: "/api/proxy/google/:path*",
//             // destination: "https://apigoogle.com/:path*",
//         },
//     ];

//     return {
//         beforeFiles: ret,
//     };
// };

export default nextConfig;
