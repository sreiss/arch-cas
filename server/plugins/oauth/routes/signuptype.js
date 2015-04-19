/**
 * SignupType routes.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

module.exports = function(signuptypeController, signuptypeRouter, signuptypeMiddleware)
{
    signuptypeRouter.route('/:signuptype')
        .all(signuptypeMiddleware.checkSignupType)
        .get(signuptypeController.getUsers);
};