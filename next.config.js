/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

module.exports = {
  assetPrefix: isGitHubPages ? "/flappy-gulla/" : "",
  basePath: isGitHubPages ? "/flappy-gulla" : "",
  trailingSlash: isGitHubPages,
  images: {
    unoptimized: true,
  },
};
