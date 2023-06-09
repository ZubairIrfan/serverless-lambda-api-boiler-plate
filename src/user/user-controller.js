const serverMessages = require('../../common/messages');
const UserDB = require('./user-db');
const Boom = require('boom');

const userDB = new UserDB();

function userController() {
  // Constructor
}

userController.prototype.getUserProfile = async (userEmail) => {
  try {
    // call database api to get user details
    const userData = await userDB.getUserByEmail(userEmail);
    return userData;
  } catch (error) {
    throw Boom.internal(serverMessages.user.ERROR_GETTING_USER_PROFILE, error);
  }
};

module.exports = userController;
