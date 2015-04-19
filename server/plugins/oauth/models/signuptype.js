/**
 * Signup type Model.
 *
 * @module arch/oauth
 * @copyright ArchTailors 2015
 */

module.exports = function(Types) {
    return {
        schema: {
            name: {type: String, required: true},
            description: {type: String},
            isPublic: {type: Boolean, default: false}
        },
        priority: 2
    };
};
