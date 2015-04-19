/**
 * OAuth controller.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

var ArchSaveError = GLOBAL.ArchSaveError;
var ArchFindError = GLOBAL.ArchFindError;

module.exports = function(userService)
{
    return {
        /** Save user.*/
        saveUser: function(req, res)
        {
            // Get posted user.
            var user = req.body;

            // Saving user.
            userService.saveUser(user).then(function(result)
            {
                res.status(201).json({"count" : (result ? 1 : 0), "data" : result});
            }).
            catch(function(err)
            {
                res.status(500).json({"error" : new ArchSaveError(err.message)});
            });
        },
/*
        /** Get user. */
        getUser: function(req, res)
        {
            // Get parameter.
            var accesstoken = req.params.accesstoken;

            // Get user.
            userService.getUser(accesstoken).then(function(result)
            {
                res.status(result ? 200 : 204).json({"count" : (result ? 1 : 0), "data" : result});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        },

        /** Delete user. */
        deleteUser: function(req, res)
        {
            // Get user id.
            var id = req.params.id;

            // Delete user.
            userService.deleteUser(id).then(function(result)
            {
                res.status(result ? 200 : 204).json({"count" : result ? 0 : 1, "data" : result});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchDeleteError(err.message)});
            });
        }
    };
};
