/**
 * Client Model.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

module.exports = function(Types) {
    return {
        schema: {
            clientId: { type: String },
            clientSecret: { type: String },
            clientRedirectUri: { type: String }
        },
        priority: 1
    };
};