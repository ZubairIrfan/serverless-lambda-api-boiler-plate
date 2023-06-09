const { serializeError } = require('serialize-error');

const buildResponse = (statusCode, data, message, isSuccess, noCache) => {
  const body = JSON.stringify({
    data,
    message,
    success: isSuccess
  });
  const response = {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*"
    },
    body
  };
  if (noCache) {
    response.headers['Cache-Control'] = 'private, no-cache, no-store, must-revalidate';
    response.headers['Expires'] = '-1'; // eslint-disable-line
    response.headers['Pragma'] = 'no-cache'; // eslint-disable-line
  }
  return response;
}

module.exports.success = (body, message, noCache) => {
  return buildResponse(200, body, message, true, noCache);
}

module.exports.failure = async (err, event) => {
  let message = "Server Error";
  let statusCode = 500;
  if (err instanceof Error) {
    err = serializeError(err);
    if (err.isBoom) {
      if (err.data) {
        err.errorData = Object.assign(err.data);
        delete err.data;
      }
      if (err.output && err.output.statusCode) {
        statusCode = err.output.statusCode;
      }

      message = `${err.message}`;
      delete err.message;
    }
  }
  return buildResponse(statusCode, err, message); // eslint-disable-line 
}
