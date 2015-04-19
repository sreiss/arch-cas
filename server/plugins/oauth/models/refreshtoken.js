/**
 * Refresh token Model.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

module.exports = function(Types) {
    return {
        schema: {
            refreshToken: { type: String },
            clientId: { type: String },
            userId: { type: String },
            expires: { type: Date }
        },
        priority: 4
    };
};