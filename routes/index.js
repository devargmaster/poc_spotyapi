const helloRoute = require('./hello.route');

function initRoutes(app) {
    app.use('/api/v1/hello', helloRoute);
}

module.exports = {
    initRoutes,
};