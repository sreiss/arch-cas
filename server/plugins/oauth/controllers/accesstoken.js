/**
 * OAuth controller.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

var ArchSaveError = GLOBAL.ArchSaveError;
var ArchFindError = GLOBAL.ArchFindError;

module.exports = function(accesstokenService)
{
    return {
        /** Get access token. */
        getAccesstoken: function(req, res)
        {
            // Get parameter.
            var accesstoken = req.params.accesstoken;

            // Get user.
            accesstokenService.getAccesstoken(accesstoken).then(function(result)
            {
                res.status(result ? 200 : 204).json({"count" : (result ? 1 : 0), "data" : result});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        }
    };
};
