const express = require('express');
const router = express.Router();
const moviesCtrl = require('../../controllers/movies');

/*---------- Public Routes ----------*/
router.get('/trending', moviesCtrl.fetchTrendingMovies);
router.get('/details', moviesCtrl.getMovieDetails);
router.get('/search', moviesCtrl.movieSearch);
router.get('/popular', moviesCtrl.fetchPopularMovies);

// router.get('/loadMore', moviesCtrl.loadMoreMovies)

/*---------- Protected Routes ----------*/

module.exports = router;