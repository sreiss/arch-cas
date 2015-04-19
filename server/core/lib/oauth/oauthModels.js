var mongoose = require('mongoose'),
    model = module.exports;

var AccesstokenModel = mongoose.model('Accesstoken'),
    RefreshtokenModel = mongoose.model('Refreshtoken'),
    ClientModel = mongoose.model('Client'),
    UserModel = mongoose.model('User');

// OAuth Server Callback - getAccessToken.
model.getAccessToken = function (bearerToken, callback)
{
    console.log('in getAccessToken (bearerToken: ' + bearerToken + ')');

    AccesstokenModel.findOne({ accessToken: bearerToken }, callback);
};

// OAuth Server Callbacks - getClient.
model.getClient = function (clientId, clientSecret, callback)
{
    console.log('in getClient (clientId: ' + clientId + ', clientSecret: ' + clientSecret + ')');

    if(clientSecret === null)
    {
        return ClientModel.findOne({ clientId: clientId }, callback);
    }

    ClientModel.findOne({ clientId: clientId, clientSecret: clientSecret }, callback);
};

// OAuth Server Callbacks - grantTypeAllowed.
model.grantTypeAllowed = function (clientId, grantType, callback)
{
    console.log('in grantTypeAllowed (clientId: ' + clientId + ', grantType: ' + grantType + ')');

    if(grantType === 'password')
    {
        ClientModel.findOne({clientId: clientId}).exec(function (err, client)
        {
            if(err)
            {
                callback(true, false)
            }
            else if(client == null)
            {
                callback(false, false)
            }
            else
            {
                callback(false, true);
            }
        });
    }
    else if(grantType === 'refresh_token')
    {
        RefreshtokenModel.findOne({clientId: clientId}).exec(function (err, refreshToken)
        {
            if(err)
            {
                callback(true, false)
            }
            else if (refreshToken == null)
            {
                callback(false, false)
            }
            else
            {
                callback(false, true);
            }
        });
    }
    else
    {
        callback(false, false);
    }
};

// OAuth Server Callbacks - saveAccessToken.
model.saveAccessToken = function (token, clientId, expires, userId, callback)
{
    console.log('in saveAccessToken (token: ' + token + ', clientId: ' + clientId + ', userId: ' + userId + ', expires: ' + expires + ')');

    var accessToken = new AccesstokenModel(
    {
        accessToken: token,
        clientId: clientId,
        userId: userId,
        expires: expires
    });

    accessToken.save(callback);
};

// OAuth Server Callbacks - getUser.
model.getUser = function (username, password, callback)
{
    console.log('in getUser (username: ' + username + ', password: ' + password + ')');

    UserModel.findOne({username: username, password: password}, function(err, user)
    {
        if(err)
        {
            return callback(err);
        }
        else if(user)
        {
            callback(null, user._id);
        }
        else
        {
            callback(null, null);
        }
    });
};

// OAuth Server Callbacks - saveRefreshToken.
model.saveRefreshToken = function (token, clientId, expires, userId, callback)
{
    console.log('in saveRefreshToken (token: ' + token + ', clientId: ' + clientId +', userId: ' + userId + ', expires: ' + expires + ')');

    var refreshToken = new RefreshtokenModel(
    {
        refreshToken: token,
        clientId: clientId,
        userId: userId,
        expires: expires
    });

    refreshToken.save(callback);
};

// OAuth Server Callbacks - getRefreshToken.
model.getRefreshToken = function (refreshToken, callback)
{
    console.log('in getRefreshToken (refreshToken: ' + refreshToken + ')');

    RefreshtokenModel.findOne({ refreshToken: refreshToken }, callback);
};