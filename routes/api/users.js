const express = require('express');
const router = express.Router();
const usersCtrl = require('../../controllers/users');
const passport = require("passport");
//=======================================



router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.get('/watchlist', usersCtrl.addMovieToWatchlist);
router.delete('/watchlist/:id', usersCtrl.removeMovieFromWatchlist);
router.get('/:username', usersCtrl.profile);



module.exports = router;