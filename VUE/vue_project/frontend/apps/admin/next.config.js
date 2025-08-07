const isDev = process.env['NODE_ENV'] === 'development'

module.exports = {
  transpilePackages: ['ui', 'library', 'editor'],
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isDev ? '' : '/ispa',
}
