/**
 * User middleware.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

var validator = require('validator');
var ArchParameterError = GLOBAL.ArchParameterError;

module.exports = function() {
    return {
        checkUserId: function(req, res, next)
        {
            // Check user id.
            var userId = req.params.id || ''

            if(!validator.isMongoId(userId))
            {
                throw new ArchParameterError("User Id isn't a valid MongoDB ID.")
            }

            next();
        },

        checkSaveUser: function(req, res, next)
        {
            // Get user data.
            var userData = req.body;

            // Check user first name (length >= 3).
            var userFirstName = userData.fname || '';
            if(!validator.isLength(userFirstName, 3))
            {
                throw new ArchParameterError("User first name must contain at least 3 chars.")
            }

            // Check user first name (length >= 3).
            var userLastName = userData.lname || '';
            if(!validator.isLength(userLastName, 3))
            {
                throw new ArchParameterError("User last name must contain at least 3 chars.")
            }

            // Check user signuptype.
            var userSignupTypeName = userData.signuptype.name || {};
            if(!validator.isLength(userSignupTypeName, 3))
            {
                throw new ArchParameterError("User signup type must contain at least 3 chars.")
            }

            next();
        },

        checkUpdateUser: function(req, res, next)
        {
            // Get user data.
            var userData = req.body.user;

            // Check user first name (length >= 3).
            var userFirstName = userData.fname || '';
            if(!validator.isLength(userFirstName, 3))
            {
                throw new ArchParameterError("User first name must contain at least 3 chars.")
            }

            // Check user first name (length >= 3).
            var userLastName = userData.lname || '';
            if(!validator.isLength(userLastName, 3))
            {
                throw new ArchParameterError("User last name must contain at least 3 chars.")
            }

            next();
        }
    };
};
