const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const cMapsDir = path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'cmaps')

module.exports = {
  transpilePackages: ['ui', 'library', 'editor'],
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node/,
      use: 'raw-loader',
    })

    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: cMapsDir,
            to: 'cmaps/',
          },
        ],
      })
    )

    return config
  },
  // generateEtags: false,
}
