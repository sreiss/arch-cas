/**
 * OAuth service.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

var Q = require('q');
var crypto = require('crypto');

module.exports = function(User, Client, userService, signuptypeService, accesstokenService) {
    return {
        /** Save user. */
        saveUser: function(userData)
        {
            var deferred = Q.defer();

            // Get signup type.
            signuptypeService.getSignuptype(userData.signuptype.name).then(function(signuptype)
            {
                if(signuptype)
                {
                    return signuptype;
                }
                else
                {
                    signuptypeService.saveSignuptype(userData.signuptype).then(function(signuptype)
                    {
                        return signuptype;
                    });
                }
            })
            .then(function(signuptype)
            {
                var user = new User();
                user.username = userData.email;
                user.password = 'b238c13e822536cad3ac57a2280fbf45';
                user.fname = userData.fname;
                user.lname = userData.lname;
                user.email = userData.email;
                user.signuptype = signuptype._id;

                user.save(function(err, user)
                {
                    if(err)
                    {
                        deferred.reject(err.message);
                    }
                    else
                    {
                        deferred.resolve(user);
                    }
                });
            })
            .catch(function(err)
            {
                deferred.reject(err)
            });

            return deferred.promise;
        },

        /** Update user. */
        updateUser: function(userData)
        {
            var deferred = Q.defer();

            User.update({_id: userData.id},
            {
                fname: userData.fname,
                lname: userData.lname,
                password: userData.password
            },
            function(err, numberAffected, rawResponse)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else
                {
                    deferred.resolve(rawResponse);
                }
            })

            return deferred.promise;
        },

        /** Get user. */
        getUser: function(id)
        {
            var deferred = Q.defer();

            // Get access token.
            User.findOne({_id: id}).populate('signuptype').exec(function (err, user)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else
                {
                    deferred.resolve(user);
                }
            });

            return deferred.promise;
        },

        /** Delete user. */
        deleteUser: function(id)
        {
            var deferred = Q.defer();

            User.findOneAndRemove({_id:id}).exec(function(err, result)
            {
                if(err)
                {
                    deferred.reject(err);
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