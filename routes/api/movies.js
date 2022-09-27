const express = require('express');
const router = express.Router();
const moviesCtrl = require('../../controllers/movies');

/*---------- Public Routes ----------*/
router.get('/session', moviesCtrl.createSession);
router.get('/trending', moviesCtrl.fetchTrendingMovies);
router.get('/details', moviesCtrl.getMovieDetails);
router.get('/reviews', moviesCtrl.getMovieReviews);
router.post('/rating', moviesCtrl.rateMovie);
router.delete('/rating', moviesCtrl.deleteMovieRating);
router.get('/search', moviesCtrl.movieSearch);
/*---------- Protected Routes ----------*/

module.exports = router;