const path = require('path')

const basePath = (...paths) => path.join(path.dirname(require.main.filename), ...paths)

const viewsPath = (...paths) => basePath('views', ...paths)
const routesPath = (...paths) => basePath('routes', ...paths)
const publicPath = (...paths) => basePath('public', ...paths)

module.exports = {
    basePath,
    viewsPath,
    routesPath,
    publicPath
}
