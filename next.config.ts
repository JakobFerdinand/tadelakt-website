import path from 'node:path';
import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  sassOptions: { loadPaths: [path.resolve('.')], quietDeps: true },
};

export default config;
