var request = require('request');

function twitter(req, res, next) {
  var twitterKey    = process.env.TWITTER_KEY;
  var twitterSecret = process.env.TWITTER_SECRET;
  var authCode      = window.btoa(`${encodeURIComponent(twitterKey)}:${encodeURIComponent(twitterSecret)}`);

  var options = {
    url: 'https://api.twitter.com/oauth2/token',
    headers: {
          'Authorization': `Basic ${authCode}`,
          'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: 'grant_type=client_credentials'
  }

  // get bearer token
  request.post(options, function(err, res, body) {
    if (err) {
      console.log(err)
    } else {
      console.log(body)
    }
  });

};

module.exports = {
  twitter: twitter
};
