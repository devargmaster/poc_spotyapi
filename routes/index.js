const helloRoute = require('./hello.route');
const albumRoute = require('./album.route');

function initRoutes(app) {
    app.use('/api/v1/hello', helloRoute);
    app.use('/api/v1/album', albumRoute);
}

module.exports = {
    initRoutes,
};