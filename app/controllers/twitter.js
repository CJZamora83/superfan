var request = require('request');
var access_token;

// making it a route so that it would be easier to reset the variable 
// without restarting the server
function jwt(req, res, next) {
  // URL encode the consumer key and the consumer secret according to RFC 1738
  var key = encodeURIComponent(process.env.SUPERFAN_TWITTER_KEY);
  var secret = encodeURIComponent(process.env.SUPERFAN_TWITTER_SECRET);
  
  // Concatenate the encoded consumer key, a colon character ”:”, and the encoded consumer secret
  var token = key + ':' + secret;
  
  // Base64 encode the string
  token = new Buffer(token, 'utf8').toString('base64');
  
  // oauth app access token request
  request({
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + token, 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    uri: 'https://api.twitter.com/oauth2/token',
    body: 'grant_type=client_credentials'
  }, function (er, response, body) {
    if (er) {
      console.log(er)
    }

    if (JSON.parse(body).token_type === 'bearer') {
      access_token = JSON.parse(body).access_token;
      console.log(access_token);
      res.json({
        access_token: access_token
      });
    } else {
      console.log('We need bearer not ' + JSON.parse(body).token_type);
      res.json({
        error: 'Wrong Token Type'
      });
    }
  });
}

// setting this route up just because it might be useful later
// and you wouldnt have to curl twitter you could just hit this route
function invalidateToken (req, res, next) {

}

function search(req, res, next) {

}

module.exports = {
  search: search,
  jwt: jwt
};
