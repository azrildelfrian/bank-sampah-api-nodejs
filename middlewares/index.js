const authMiddleware = require('./authMiddleware');
const authorize = require('./authorize');
const authorizeRoles = require('./authorizeRoles');
const { validate } = require('./validateMiddleware');
const authorizeByRoute = require('./authorizeByRoute');

module.exports = {
  authMiddleware,
  authorize,
  authorizeRoles,
  validate,
  authorizeByRoute,
};
