/**
 * Client middleware.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

var validator = require('validator');
var ArchParameterError = GLOBAL.ArchParameterError;

module.exports = function() {
    return {
        checkClient: function(req, res, next)
        {
            // Get client data.
            var clientData = req.body;

            // Check client name.
            var clientName = clientData.name || '';
            if(!validator.isLength(clientName, 3))
            {
                throw new ArchParameterError("Client name must contain at least 3 chars.")
            }

            // Check client redirect uri.
            var clientRedirectUri = clientData.redirect_uri || '';
            if(!validator.isURL(clientRedirectUri))
            {
                throw new ArchParameterError("Client redirect uri isn't a valid url.")
            }

            next();
        },

        checkClientCredentials: function(req, res, next)
        {
            // Check client id.
            var clientId = req.params.clientId || '';
            if(!validator.isLength(clientId, 10))
            {
                throw new ArchParameterError("Client id must contain at least 10 chars.")
            }

            next();
        }
    };
};
