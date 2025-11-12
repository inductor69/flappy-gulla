/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

module.exports = {
  assetPrefix: isGitHubPages ? "/flappy-gulla/" : "",
  basePath: isGitHubPages ? "/flappy-gulla" : "",
  trailingSlash: isGitHubPages,
  images: {
    unoptimized: true,
  },
  output: isGitHubPages ? 'export' : undefined,
};
