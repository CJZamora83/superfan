var express = require('express'),
    router  = new express.Router();

// Require controllers.
var userController = require('../controllers/users.js'),
    authController = require('../controllers/oauth.js'),
    twitterController = require('../controllers/twitter.js'),
    celebrityController = require('../controllers/celebrity.js'),
    instagramController = require('../controllers/instagram.js');


// root path:
// router.get('/', pagesController.welcome);

//||||||||||||||||||||||||||--
// USERS CRUD SERVICES
//||||||||||||||||||||||||||--
// router.get('/users', userController.index);

//||||||||||||||||||||||||||--
// INSTAGRAM GUEST OAUTH SERVICES
//||||||||||||||||||||||||||--
// is this deprecated?
router.post('/auth/instagram', authController.instagram);

//||||||||||||||||||||||||||--
// CELEBRITY SERVICES
//||||||||||||||||||||||||||--

// celebrity tags route
router.get('/celebrities/tags', celebrityController.tags);

// celebrity full objects route
router.get('/celebrities/list', celebrityController.list);


//||||||||||||||||||||||||||--
// TWITTER SERVICES
//||||||||||||||||||||||||||--

// do we need this anymore?
// twitter auth path (user auth)
router.get('/twitter/auth', twitterController.oauth);

// DEPRECATED
// =====================================================
// twitter jwt path (app only auth)
// router.get('/jwt/twitter', twitterController.jwt);

// twitter invalidate jwt path (only use if app only token becomes compromised for some reason)
// router.get('/invaljwt/twitter', twitterController.invalJwt);
// =====================================================

// twitter search path
router.get('/twitter/search', twitterController.search);

// list all instagram posts
router.get('/twitter/list', instagramController.list);

//||||||||||||||||||||||||||--
// INSTAGRAM SERVICES
//||||||||||||||||||||||||||--

// instagram search route
router.get('/instagram/search', instagramController.search);

// list all instagram posts
router.get('/instagram/list', instagramController.list);

module.exports = router;
