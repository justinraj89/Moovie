const apiUrlPrefix = "https://api.themoviedb.org/3";
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const apiKey = process.env.APIKEY


//---------------- TMDB API CALLS-----------------------------------
//===================================================================

const fetchTrendingMovies = async (req, res) => {
  let page = req.query.page;
  const url = `${apiUrlPrefix}/trending/movie/day?api_key=${apiKey}&page=${page}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const trendingMovieData = await response.json();
      res.status(200).json(trendingMovieData);
    }
  } catch (err) {
    console.log(err);
  }
};

//====================================================================================

const movieSearch = async (req, res) => {
  const search = req.query.query
  const page = req.query.page
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}&page=${page}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const movieQuery = await response.json();
      res.status(200).json(movieQuery)
    }
  } catch (err) {
    console.log(err);
  }
};

//==============================================================================

const fetchPopularMovies = async (req, res) => {
  const url = `${apiUrlPrefix}/movie/popular?api_key=${apiKey}&language=en-US&page=1`
  try {
    const response = await fetch(url);
    if (response.ok) {
      const popularMovies = await response.json();
      res.status(200).json(popularMovies);
    }
  } catch (err) {
    console.log(err);
  }
};

//===================================================================================

const getMovieDetails = async (req, res) => {
  let movieId = req.query.id;
  const url = `${apiUrlPrefix}/movie/${movieId}?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const detailsData = await response.json();
      console.log(detailsData);
      // error handler goes here
      res.status(200).json(detailsData);
    }
  } catch (err) {
    console.log(err);
  }
};

//===============================================================================================




module.exports = {
  fetchTrendingMovies,
  getMovieDetails,
  movieSearch,
  fetchPopularMovies,

};
