var nconf = require('nconf'),
    path = require('path');

module.exports = {
    name: 'arch.config',
    attach: function (opts) {
        var app = this;

        var utils = app.arch.utils;
        if (!utils) {
            throw new Error('Please, load utils before config');
        }

        var config = app.arch.config = nconf
            .argv()
            .env()
            .file({file: path.join(__dirname, '..', '..', 'config', 'config.json')});


        var pluginsDir = path.join(__dirname, '..', '..', (config.get('pluginsDir') || 'plugins'));
        var httpPort = utils.normalizePort(config.get('http:port')) || 3001;
        var dbUrl = config.get('db:url') || 'mongodb://localhost/archCore';

        config.set('pluginsDir', pluginsDir);
        config.set('http:port', httpPort);
        config.set('db:url', dbUrl);
    },
    init: function (done) {
        var app = this;

        var config = app.arch.config;
        var plugins = app.arch.plugins;
        var pluginsDir = config.get('pluginsDir');

        return done();
    }
};