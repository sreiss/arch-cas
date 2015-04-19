var path = require('path'),
    ArchError = require(path.join(__dirname, '.', '/ArchError'));

var ArchAuthError = function (message, status, type) {
    this.message = message || 'You must be logged in proceed to this action.';
    this.status = status || 401;
    this.type = type || 'ArchAuthError';
};
ArchAuthError.prototype = Object.create(ArchError.prototype);
ArchAuthError.prototype.constructor = ArchAuthError;

module.exports = ArchAuthError;