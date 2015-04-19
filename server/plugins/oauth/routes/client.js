/**
 * Client routes.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

module.exports = function(clientController, clientRouter, clientMiddleware)
{
    clientRouter.route('/')
        .post(clientMiddleware.checkClient)
        .post(clientController.saveClient);

    clientRouter.route('/:clientId')
        .get(clientMiddleware.checkClientCredentials)
        .get(clientController.getClient);
};