/**
 * User routes.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

module.exports = function(userController, userRouter, userMiddleware)
{
    userRouter.route('/')
        .all(userMiddleware.checkUser)
        .post(userController.saveUser);

    userRouter.route('/:accesstoken')
        .get(userController.getUser);

    userRouter.route('/:id')
        .all(userMiddleware.checkUserId)
        .get(userController.getUser)
        .delete(userController.deleteUser);
};