/**
 * User routes.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

module.exports = function(userController, userRouter, userMiddleware)
{
    userRouter.route('/')
        .post(userMiddleware.checkSaveUser)
        .post(userController.saveUser)
        .put(userMiddleware.checkUpdateUser)
        .put(userController.updateUser);

    userRouter.route('/:id')
        .all(userMiddleware.checkUserId)
        .get(userController.getUser)
        .delete(userController.deleteUser);
};