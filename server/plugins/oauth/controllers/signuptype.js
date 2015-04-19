/**
 * SignupType controller.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

var ArchSaveError = GLOBAL.ArchSaveError;
var ArchFindError = GLOBAL.ArchFindError;

module.exports = function(signuptypeService)
{
    return {
        /** Get users by signup type. */
        getUsers: function(req, res)
        {
            // Get parameter.
            var signuptype = req.params.signuptype;

            // Get users by signup type.
            signuptypeService.getUsers(signuptype).then(function(result)
            {
                res.status(result ? 200 : 204).json({"count" : (result ? result.length : 0), "data" : result});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        }
    };
};
