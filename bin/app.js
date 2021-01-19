"use strict";
exports.__esModule = true;
var fastify_1 = require("fastify");
var build_1 = require("./../build");
var server = fastify_1["default"]();
server.get('/', function (req, res) {
    res.send('hey25');
});
server.register(build_1.homeRoutes, { prefix: '/home' });
server.register(build_1.garageRoutes, { prefix: '/garage' });
server.register(build_1.garageRoutes2, { prefix: '/garage' });
server.listen(8000, function (err, address) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Listening on port 8000');
});
