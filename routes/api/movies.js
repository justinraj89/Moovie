const express = require('express');
const router = express.Router();
const moviesCtrl = require('../../controllers/movies');

/*---------- Public Routes ----------*/
router.get('/trending', moviesCtrl.fetchTrendingMovies);
router.get('/details', moviesCtrl.getMovieDetails);
router.get('/reviews', moviesCtrl.getMovieReviews);
router.get('/search', moviesCtrl.movieSearch);
router.get('/popular', moviesCtrl.fetchPopularMovies)
/*---------- Protected Routes ----------*/

module.exports = router;