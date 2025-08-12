/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Fix dev cache issues: keep cache in memory while developing
  webpack(config, { dev }) {
    if (dev) {
      config.cache = { type: "memory" };
    }
    return config;
  },

  // OPTIONAL: Allow your LAN IP during dev to avoid the "Cross origin request" warning.
  // If your Next version doesn't support this yet, just comment this block out.
  // Replace the IP below with yours if different.
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://192.168.0.84:3000",
  ],
};

export default nextConfig;
