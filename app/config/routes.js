var express = require('express'),
    router  = new express.Router();

// Require controllers.
var userController = require('../controllers/users.js');
var authController = require('../controllers/oauth.js');
var twitterController = require('../controllers/twitter.js');
var celebrityController = require('../controllers/celebrity.js')

// root path:
// router.get('/', pagesController.welcome);

//||||||||||||||||||||||||||--
// USERS CRUD SERVICES
//||||||||||||||||||||||||||--
// router.get('/users', userController.index);


//||||||||||||||||||||||||||--
// INSTAGRAM GUEST OAUTH SERVICES
//||||||||||||||||||||||||||--
router.post('/auth/instagram', authController.instagram);


//||||||||||||||||||||||||||--
// TWITTER SERVICES
//||||||||||||||||||||||||||--

// twitter auth path (user auth)
router.get('/auth/twitter', twitterController.oauth);

// twitter jwt path (app only auth)
// router.get('/jwt/twitter', twitterController.jwt);

// twitter invalidate jwt path (only use if app only token becomes compromised for some reason)
// router.get('/invaljwt/twitter', twitterController.invalJwt);

// twitter search path
router.get('/search/twitter/:keyword', twitterController.search);

//||||||||||||||||||||||||||--
// CELEBRITY SERVICES
//||||||||||||||||||||||||||--

// celebrity tags route
router.get('/tags/celebrities', celebrityController.tags);


module.exports = router;
