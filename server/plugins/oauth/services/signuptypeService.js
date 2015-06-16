/**
 * Signup type service.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

var Q = require('q');

module.exports = function(User, Signuptype) {
    return {
        /** Save signup type. */
        saveSignuptype: function(signuptypeData)
        {
            var deferred = Q.defer();

            var signuptype = new Signuptype();
            signuptype.name = signuptypeData.name;
            signuptype.description = signuptypeData.description;
            signuptype.isPublic = signuptypeData.isPublic || 0;

            signuptype.save().exec(function(err, signuptype)
            {
                if(err)
                {
                    deferred.reject(err.message);
                }
                else
                {
                    deferred.resolve(signuptype);
                }
            })

            return deferred.promise;
        },

        /** Get signup type's informations. */
        getSignuptype: function(name)
        {
            var deferred = Q.defer();

            Signuptype.findOne({name: name}).exec(function(err, result)
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
        },

        /** Get users. */
        getUsers: function(signuptype)
        {
            var deferred = Q.defer();

            User.find({'signuptype.name' : signuptype}).populate('signuptype').exec(function (err, users)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else
                {
                    deferred.resolve(users);
                }
            });

            return deferred.promise;
        }
    };
};