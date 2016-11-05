var express = require('express'),
    router  = new express.Router();

// Require controllers.
var userController    = require('../controllers/users');
var authController    = require('../controllers/oauth');
var twitterController = require('../controllers/twitter');

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

// twitter jwt auth path
router.get('/jwt/twitter', twitterController.jwt);


module.exports = router;
