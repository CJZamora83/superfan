var express = require('express'),
    router = express.Router();

// Require fishes controller
var FishesCtrl = require('../controllers/fishes'),
    UsersCtrl  = require('../controllers/users');


// GET CURRENT USER - WE'RE DOING THIS IN THE BROWSER THOUGH!
// apiRouter.get('/me', function(req, res) {
//   res.send(req.decoded);
// });

//||||||||||||||||||||||||||--
// USERS CRUD SERVICES
//||||||||||||||||||||||||||--
router.post('/login',                               UsersCtrl.userAuth);
router.get('/users',                                UsersCtrl.usersAll);
router.post('/users',                               UsersCtrl.userCreate);
router.get('/users/:id',     UsersCtrl.tokenVerify, UsersCtrl.userShow);
router.put('/users/:id',     UsersCtrl.tokenVerify, UsersCtrl.userUpdate);
router.delete('/users/:id',  UsersCtrl.tokenVerify, UsersCtrl.userDelete);

//||||||||||||||||||||||||||--
// FISHES CRUD SERVICES
//||||||||||||||||||||||||||--
router.get('/fishes/:id',    UsersCtrl.tokenVerify, FishesCtrl.fishShow);
router.get('/fishes',        UsersCtrl.tokenVerify, FishesCtrl.fishIndex);
router.post('/fishes',       UsersCtrl.tokenVerify, FishesCtrl.fishCreate);
router.put('/fishes/:id',    UsersCtrl.tokenVerify, FishesCtrl.fishUpdate);
router.delete('/fishes/:id', UsersCtrl.tokenVerify, FishesCtrl.fishDelete);

module.exports = router;
