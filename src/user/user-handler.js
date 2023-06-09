const { parseAPIGatewayEvent } = require('../../common/parser');
const { failure, success } = require('../../common/response');
const User = require('./user-controller');

const serverMessages = require('../../common/messages');

const userCtrl = new User();

exports.getUserProfile = async (event, context, callback) => {
  let response;
  try {
    const { user } = await parseAPIGatewayEvent(event);
    const userProfile = await userCtrl.getUserProfile(user.email);
    response = success(userProfile, serverMessages.user.SUCCESSFULLY_GET_USER_PROFILE);
  } catch (error) {
    response = failure(error);
  }
  return response;
};
