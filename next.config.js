/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ["localhost", "ebook.netbookflix.com", "127.0.0.1:8000"],
  },
  env: {
    API_URL:
      process.env.NODE_ENV == "development"
        ? "http://localhost:8000/api/"
        : "https://stage.api.netbookflix.com/api/",
    API_KEY: "a8c02ffd-128b-448d-9959-9afb05ff08b3",
    AUTH_USER: "netbookflix",
    AUTH_PASSWORD: "r2yCxIV64gC%GzBwALC7Tn8yvV",
    NEXT_SHARP_PATH: "/tmp/node_modules/sharp",
    PAYTM_MID: "nyMhCF65590556327274",
    PAYTM_HOST: "https://securegw-stage.paytm.in/",
    NEXT_PUBLIC_MEASUREMENT_ID: "G-3FG9Q2BZJH",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.node/,
      use: "raw-loader",
    });

    config.module.rules.push({
      test: /\.(pdf)$/,
      type: "asset/resource",
    });

    return config;
  },
  crossOrigin: "anonymous",
};

module.exports = nextConfig;
