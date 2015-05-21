/**
 * OAuth service.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

var Q = require('q');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

module.exports = function(User, Client, userService, signuptypeService, config) {
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
                user.fname = userData.fname;
                user.lname = userData.lname;
                user.email = userData.email;
                user.signuptype = signuptype._id;

                var password = userService.generateRandomPassword();
                user.password = crypto.createHash('md5').update(password).digest("hex");

                user.save(function(err, user)
                {
                    if(err)
                    {
                        deferred.reject(err.message);
                    }
                    else
                    {
                        userService.sendMail(user, password);

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
        },

        /** Generate random password. */
        generateRandomPassword: function()
        {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for( var i=0; i < 6; i++ )
            {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            return text;
        },

        /** Send Mail. */
        sendMail: function(user, password)
        {
            var transporter = nodemailer.createTransport(smtpTransport(
            {
                service: "Gmail", // sets automatically host, port and connection security settings
                auth:
                {
                    user: config.get('mail:username'),
                    pass: config.get('mail:password')
                },
                tls: {rejectUnauthorized: false},
                debug:true
            }));

            var mailOptions =
            {
                from: config.get('mail:noreply'),
                // to: oauthUser.email,
                to: "maxime@rauch.fr",
                subject: 'CAS - Inscription réussie ✔',
                html:   'Bonjour ' + user.fname + ' ' + user.lname + ',<br><br>' +
                        'Votre compte a été créé avec succés.<br>' +
                        'Veuillez trouver ci-dessous le récapitulatif de vos identifiants.<br><br>' +
                        '- Identifiant : ' + user.username + '<br>' +
                        '- Mot de passe : ' + password + '<br><br>' +
                        "L'équipe vous remercie et vous souhaite une bonne visite.<br>" +
                        '__<br>Ceci est un message automatique, merci de ne pas y répondre.'
            };

            transporter.sendMail(mailOptions, function(error, info)
            {
                if(error)
                {
                    console.log("Message automatique d'inscription " + user.username + "/" + password + " envoyé avec succés.");
                }
                else
                {
                    console.log("Message automatique d'inscription " + user.username + "/" + password + " non envoyé.");
                }
            });
        }
    };
};