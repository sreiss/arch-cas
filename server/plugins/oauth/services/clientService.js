/**
 * OAuth service.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

var Q = require('q');
var crypto = require('crypto');

module.exports = function(Client) {
    return {
        /** Save client. */
        saveClient: function(clientData)
        {
            var deferred = Q.defer();

            var now = new Date().getTime();
            clientData.clientId = clientData.name + '_' + now.toString() + '_' + Math.floor(Math.random() * 9999);
            clientData.clientSecret = clientData.clientId + '_' + clientData.redirect_uri;

            var client = new Client();
            client.clientId = clientData.clientId;
            client.clientSecret = crypto.createHash('sha1').update(clientData.clientSecret).digest('hex');
            client.clientRedirectUri = clientData.redirect_uri;

            client.save(function(err, client)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else
                {
                    deferred.resolve(client);
                }
            });

            return deferred.promise;
        },

        /** Get client. */
        getClient: function(clientId)
        {
            var deferred = Q.defer();

            OauthClient.findOne({clientId: clientId}).exec(function (err, client)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if (client == null)
                {
                    deferred.reject(new Error('No client matching [CLIENT_ID].'));
                }
                else
                {
                    deferred.resolve(client);
                }
            });

            return deferred.promise;
        }
    };
};