/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '*.supabase.co' }]
  },

  // Fix Vercel build hanging after successful compilation
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.done.tap('ForceExitPlugin', () => {
            setTimeout(() => process.exit(0), 0)
          })
        }
      })
    }
    return config
  }
}

module.exports = nextConfig
