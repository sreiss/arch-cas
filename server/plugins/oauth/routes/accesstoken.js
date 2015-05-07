/**
 * Access token routes.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

module.exports = function(accesstokenController, accesstokenRouter)
{
    accesstokenRouter.route('/:accesstoken')
        .get(accesstokenController.getAccesstoken);
};