import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'utfs.io', port: '' }],
  },
  webpack: (config: Configuration) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules',
        '**/.next',
        '**/C:/Users/Administrator/Cookies/**',
        '**/C:/Users/Administrator/Application Data/**',
        '**/C:/Users/Administrator/**', // 更广泛地避免扫描整个用户目录
      ],
    };

    return config;
  },
};

export default nextConfig;
