/**
 * OAuth controller.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

var ArchSaveError = GLOBAL.ArchSaveError;
var ArchFindError = GLOBAL.ArchFindError;

module.exports = function(clientService)
{
    return {
        /** Save client.*/
        saveClient: function(req, res)
        {
            // Get posted client.
            var client = req.body;

            // Saving client.
            clientService.saveClient(client).then(function(result)
            {
                res.status(201).json({"count" : (result ? 1 : 0), "data" : result});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchSaveError(err.message)});
            });
        },

        /** Get client's informations. */
        getClient: function(req, res)
        {
            // Get parameters.
            var clientId = req.params.clientId;

            // Get user.
            clientService.getClient(clientId).then(function(result)
            {
                res.status(201).json({"count" : (result ? 1 : 0), "data" : result});
            })
            .catch(function(err)
            {
                res.status(500).json({"error" : new ArchFindError(err.message)});
            });
        }
    };
};
