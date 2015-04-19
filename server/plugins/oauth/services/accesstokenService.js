/**
 * Access token service.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

var Q = require('q');

module.exports = function(Accesstoken) {
    return {
        /** Get access token. */
        getAccesstoken: function(accesstoken)
        {
            var deferred = Q.defer();

            Accesstoken.findOne({accessToken: accesstoken}).exec(function(err, result)
            {
                if(err)
                {
                    deferred.reject(err.message);
                }
                else
                {
                    deferred.resolve(result);
                }
            });

            return deferred.promise;
        }
    };
};