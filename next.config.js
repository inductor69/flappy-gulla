/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  assetPrefix: isProd ? "/flappy-gulla/" : "",
  basePath: isProd ? "/flappy-gulla" : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  output: 'export',
};
