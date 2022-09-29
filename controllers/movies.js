const apiUrlPrefix = "https://api.themoviedb.org/3";
const apiKey = process.env.APIKEY

//===================================================================

const fetchTrendingMovies = async (req, res) => {
  const url = `${apiUrlPrefix}/trending/movie/day?api_key=${apiKey}`;
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
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}`;
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



//===============================================================================

const createSession = async (req, res) => {
  const url = `${apiUrlPrefix}/authentication/guest_session/new?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      res.status(200).json(json)
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

const getMovieReviews = async (req, res) => {
  let movieId = req.query.id;
  const url = `${apiUrlPrefix}/movie/${movieId}/reviews?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const reviewsData = await response.json();
      // reviewsData can have multiple pages of data
      // reviewsData.results contains the review data
      console.log(reviewsData);
      res.status(200).json(reviewsData);
    }
  } catch (err) {
    console.log(err);
  }
};

//======================================================================================================

const rateMovie = async (req, res) => {
  let movieId = req.query.id;
  let rating = req.query.rating;
  const guestSessionId = localStorage.getItem("tmdb_session_id");
  const url = `${apiUrlPrefix}/movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${guestSessionId}`;
  try {
    const data = { value: Number.parseInt(rating) };
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache,);
      body: JSON.stringify(req.body),
    });

    if (response.ok) {
      const json = await response.json();
      localStorage.setItem("tmdb_session_id", json.guest_session_id);
    }
  } catch (err) {
    console.log(err);
  }
};

//=======================================================================================================

const deleteMovieRating = async (req, res) => {
  let movieId = req.query.id;
  const url = `${apiUrlPrefix}/movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${guestSessionId}`;
  const guestSessionId = localStorage.getItem("tmdb_session_id");

  try {
    const data = {};
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache,);
      body: JSON.stringify(req.body),
    });

    if (response.ok) {
      const json = await response.json();
      localStorage.setItem("tmdb_session_id", json.guest_session_id);
    }
  } catch (err) {
    console.log(err);
  }
};


// //==============================================================================================


module.exports = {
  createSession,
  fetchTrendingMovies,
  getMovieDetails,
  getMovieReviews,
  rateMovie,
  deleteMovieRating,
  movieSearch,
  fetchPopularMovies
};
