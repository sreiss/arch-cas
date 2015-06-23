/**
 * Init service.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

var Q = require('q');

module.exports = function(User, Signuptype)
{
    var initTasks =
    {
        createSuperAdminUser: function()
        {
            this.createSuperAdminSignuptype().then(function(signuptype)
            {
                User.findOne({username : "superadmin@archcas.fr"}, function(err, user)
                {
                    if(!user)
                    {
                        var user = new User(
                        {
                            _id : "55819376e6d994c34a25865c",
                            username : "superadmin@archcas.fr",
                            password : "17c4520f6cfd1ab53d8745e84681eb49",
                            fname : "Superadmin",
                            lname : "ArchCas",
                            email : "superadmin@archcas.fr",
                            signuptype : signuptype._id
                        });

                        user.save(function(err, user)
                        {
                            if(err)
                            {
                                console.log('INIT[createSuperAdminUser] : An error occured while saving SUPERADMIN user.');
                            }
                            else
                            {
                                console.log('INIT[createSuperAdminUser] : SUPERADMIN user successfully created.');
                            }
                        });
                    }
                    else
                    {
                        console.log('INIT[createSuperAdminUser] : SUPERADMIN user already exists.');
                    }
                });
            })
            .catch(function()
            {
                console.log('INIT[createSuperAdminSignuptype] : An error occured while retrieving SUPERADMIN signuptype.');
            });
        },

        createSuperAdminSignuptype: function()
        {
            var deferred = Q.defer();

            Signuptype.findOne({name : "SUPERADMIN"}, function(err, signuptype)
            {
                if(err)
                {
                    deferred.reject(err);
                }
                else if(!signuptype)
                {
                    var signuptype = new Signuptype(
                    {
                        name : "SUPERADMIN",
                        description : "Group of Superadmin",
                        isPublic : true
                    });

                    signuptype.save(function(err, signuptype)
                    {
                        if(err)
                        {
                            deferred.reject(err);
                        }
                        else
                        {
                            console.log('INIT[createSuperAdminSignuptype] : SUPERADMIN signuptype successfully created.');
                            deferred.resolve(signuptype);
                        }
                    });
                }
                else
                {
                    console.log('INIT[createSuperAdminSignuptype] : SUPERADMIN signuptype already exists.');
                    deferred.resolve(signuptype);
                }
            });

            return deferred.promise;
        }
    };

    initTasks.createSuperAdminUser();

    return initTasks;
};