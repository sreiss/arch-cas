var oauthserver = require('oauth2-server');

exports.name = 'arch-oauth';

exports.attach = function(opts)
{
    var app = this.arch.expressApp;

    app.oauth = oauthserver(
    {
        model: require('./oauthModels'),
        grants: ['password', 'refresh_token'],
        debug: true
    });

    app.options('/oauth/token', function(req, res)
    {
        var headers = {};

        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST, PUT, DELETE, GET, OPTIONS";
        headers["Access-Control-Allow-Credentials"] = false;
        headers["Access-Control-Max-Age"] = '86400';
        headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization";

        res.writeHead(200, headers);
        res.end();
    });

    app.all('/oauth/token', app.oauth.grant());

    app.get('/', app.oauth.authorise(), function(req, res)
    {
        res.redirect(req.query.return);
    });

    app.use(app.oauth.errorHandler());
};

exports.init = function (done)
{
    return done();
};
