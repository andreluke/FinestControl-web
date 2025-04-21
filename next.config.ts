import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack: config => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src')
    return config
  },
}

export default nextConfig
