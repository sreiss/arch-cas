var express = require('express'),
    logger = require('morgan'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    http = require('http');

exports.name = 'arch-http';

exports.attach = function(opts)
{
    var app = this;
    var expressApp = app.arch.expressApp = express();
    var config = app.arch.config;

    expressApp.set('views', path.join(__dirname, '..', 'views'));
    expressApp.set('view engine', 'jade');

    expressApp.use(logger('dev'));
    expressApp.use(bodyParser.json());
    expressApp.use(bodyParser.urlencoded({extended: false}));
    expressApp.use(cookieParser());
    expressApp.use('/', express.static(path.join(__dirname, '..', '..', 'public')));

    // Allow Cross Origin.
    var allowedOrigins = config.get('http:allowedOrigins');
    expressApp.use(function(req, res, next)
    {
        var origin = req.headers.origin;
        var method = req.method;

        if(allowedOrigins.indexOf(origin) > -1)
        {
            var headers =
            {
                'Access-Control-Allow-Origin' : origin,
                'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Credentials' : true,
                'Access-Control-Allow-Headers' : 'Content-Type, Authorization, Content-Length, X-Requested-With'
            }

            if(method == 'OPTIONS')
            {
                res.writeHead(200, headers);
                res.end();
            }
            else
            {
                res.header('Access-Control-Allow-Origin', origin);
                res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                res.header('Access-Control-Allow-Credentials', true);
                res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
            }
        }

        return next();
    });
};

exports.init = function (done)
{
    return done();
};
