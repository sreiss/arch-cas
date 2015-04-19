/**
 * SignupType middleware.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

var validator = require('validator');
var ArchParameterError = GLOBAL.ArchParameterError;

module.exports = function() {
    return {
        checkSignupType: function(req, res, next)
        {
            // Check signup type.
            var signuptype = req.params.signuptype || '';
            if(!validator.isLength(signuptype, 3))
            {
                throw new ArchParameterError("Signup Type must contain at least 3 chars.")
            }

            next();
        }
    };
};
