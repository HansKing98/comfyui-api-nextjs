/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    
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
