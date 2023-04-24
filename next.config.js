// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:type(series|peliculas)/:year/:month",
        destination: "/mejores/:type/:year/:month",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

const sentryConfig = {
  silent: true,
};

const sentryWebpackPluginOptions = {
  hideSourcemaps: true,
};

module.exports = withSentryConfig(
  nextConfig,
  sentryConfig,
  sentryWebpackPluginOptions
);
