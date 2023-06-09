const userMessages = require("../src/user/user-messages");

module.exports = {
  user: userMessages,
  generic: {
    ACCESS_ERROR: `You are not authorized to perform this operation`,
    VALIDATION_ERROR: "Validation error",
    AUTH_FAILED: "Authentication failed",
  },
};
