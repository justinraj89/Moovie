import tokenService from './tokenService'
const BASE_URL = "/api/movies/";

//=====================================

const fetchTrendingMovies = async (page) => {
  const url = `/api/movies/trending?page=${page}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const trendingMovieData = await response.json();
      return trendingMovieData;
    }
  } catch (err) {
    console.log(err);
  }
};

//===================================================================================

const fetchPopularMovies = async () => {
  const url = '/api/movies/popular';
  try {
    const response = await fetch(url);
    if (response.ok) {
      const popularMovies = await response.json();
      return popularMovies;
    }
  } catch (err) {
    console.log(err);
  }
}

//===================================================================================

const movieSearch = async (search) => {
  const url = `/api/movies/search?query=${search}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const movieQuery = await response.json();
      return movieQuery;
    }
  } catch (err) {
    console.log(err);
  }
};

//===============================================================================

const getMovieDetails = async (movieId) => {
  const url = `/api/movies/details?id=${movieId}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const detailsData = await response.json();
      console.log(detailsData);
      // error handler goes here
      return detailsData;
    }
  } catch (err) {
    console.log(err);
  }
};

//==============================================================================

const getMovieReviews = async (movieId) => {
  const url = `/api/movies/reviews?id=${movieId}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const reviewsData = await response.json();
      // reviewsData can have multiple pages of data
      // reviewsData.results contains the review data
      console.log(reviewsData);
      return reviewsData;
    }
  } catch (err) {
    console.log(err);
  }
};

//======================================================================================================

function addToWatchlist(movieInfo) {

  return fetch(`/api/users/watchlist/?id=${movieInfo.movieId}&title=${movieInfo.movieTitle}&img=${movieInfo.movieImg}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenService.getToken(), // This grabs thee JWT token out
      // local storage and send its in the header to the server
    },
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error(res.error);
  });
}


//==========================REMOVE FROM WATCHLIST==============================================

function removeMovieFromWatchlist(movieInfo) {

  return fetch(`/api/users/watchlist/${movieInfo.movieId}`, {
    method: 'DELETE',
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    }
  }).then((res) => {
    if(res.ok) return res.json();
    throw new Error (res.error)
  });
}

//===============================================================================================




export default {
  fetchTrendingMovies,
  getMovieDetails,
  getMovieReviews,
  movieSearch,
  addToWatchlist,
  fetchPopularMovies,
  removeMovieFromWatchlist,

};
