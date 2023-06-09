const { path } = require('ramda');
const jwtDecode = require('jwt-decode');


exports.parseAPIGatewayEvent = async (event) => {
  try {
    let data = {};
    if (event.body !== '') {
      try {
        data = JSON.parse(event.body);
      } catch (e) {
        console.error('Error occur during parsing request body', e);
        data = {};
      }
    }
    let user;
    if (event.headers.Authorization) {
      user = extractUserDataFromToken(event.headers.Authorization);
    }
    return {
      rawBody: event.body,
      body: data,
      path: path(['requestContext', 'resourcePath'], event),
      httpMethod: path(['requestContext', 'httpMethod'], event),
      stage: path(['requestContext', 'stage'], event),
      params: event.pathParameters || event.path,
      queryParams: (event.queryStringParameters || event.query) || {},
      cognitoPoolClaims: event.cognitoPoolClaims,
      headers: event.headers,
      user
    };
  } catch (err) {
    throw (err);
  }
}


const extractUserDataFromToken = (token) => {
  let decodedToken;
  try {
    decodedToken = jwtDecode(token);
  } catch (err) {
    console.log("could not extract jwt token");
    console.log(err);
    return {}
  }

  if (!decodedToken) {
    console.log("No Token body exists");
    console.log(token);
    return null
  }
  else {
    return decodedToken;
  }
}

exports.extractUserDataFromToken = extractUserDataFromToken;
