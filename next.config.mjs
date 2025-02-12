import createMDX from "@next/mdx";
import rehypeExpressiveCode from "rehype-expressive-code";

/** @type {import('rehype-expressive-code').RehypeExpressiveCodeOptions} */
const rehypeExpressiveCodeOptions = {};

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      // The nested array structure is required to pass options
      // to a rehype plugin
      [rehypeExpressiveCode, rehypeExpressiveCodeOptions],
    ],
  },
});

export default nextConfig;
