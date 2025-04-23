import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: config => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src')
    return config
  },
  turbopack: {
    path: path.resolve(__dirname, 'src'),
  },
}

export default nextConfig
