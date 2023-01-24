const User = require("../models/user");
const Watchlist = require("../models/watchlist");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  profile,
  addMovieToWatchlist,
  removeMovieFromWatchlist
};

//=============================================================

async function signup(req, res) {
  console.log(req.body, "<- req.body");
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token }); // shorthand for the below
    // res.json({ token: token })
  } catch (err) {
    // THIS IS AN EXAMPLE OF HOW TO HANDLE VALIDATION ERRORS FROM MONGOOSE
    if (err.name === "MongoServerError" && err.code === 11000) {
      console.log(err.message, "err.message");
      res.status(423).json({
        errorMessage: err,
        err: `${identifyKeyInMongooseValidationError(
          err.message
        )} Already taken!`,
      });
    } else {
      res.status(500).json({
        err: err,
        message: "Internal Server Error, Please try again",
      });
    }
  }
}

//=============================================================

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user, " this user in login");
    if (!user) return res.status(401).json({ err: "bad credentials" });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({ token });
      } else {
        return res.status(401).json({ err: "bad credentials" });
      }
    });
  } catch (err) {
    return res.status(401).json({ err: "error message" });
  }
}

//=============================================================

async function profile(req, res) {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) return res.status(404).json({ error: "User not found" });
    const watchlistMovies = await Watchlist.find({ user: user._id })
      .populate("user")
      .exec();
    res.status(200).json({
      data: {
        user: user,
        watchlistMovies: watchlistMovies,
      },
    });
  } catch (err) {
    console.log(err.message, " <- profile controller");
    res.status(400).json({ error: "Something went wrong" });
  }
}

//=================================================================================================

async function addMovieToWatchlist(req, res) {
  try {
    const movieInfo = {
      movieId: req.query.id,
      movieTitle: req.query.title,
      movieImg: req.query.img,
    };
    console.log("movieInfo", movieInfo);
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ error: "User not found" });

    let watchlistMovies = await Watchlist.find({ user: user._id });

    //==== IF MOVIE ALREADY ADDED TO WATCHLIST
    if (!!watchlistMovies.find((w) => w.movieId === movieInfo.movieId)) {
      res.status(200).json({
        data: {
          user: user,
          watchlistMovies: watchlistMovies,
        },
      });
      return;
    }

    let watch = { user: user, ...movieInfo };
    let watchlistMovie = new Watchlist(watch);
    await watchlistMovie.save();
    watchlistMovies = await Watchlist.find({ user: user._id });

    res.status(200).json({
      data: {
        user: user,
        watchlistMovies: watchlistMovies,
      },
    });
  } catch (err) {
    console.log(err.message, " <- profile controller");
    res.status(400).json({ error: "Something went wrong" });
  }
}

//============================================================

async function removeMovieFromWatchlist(req, res) {
  try {

    const user = await User.findOne({ email: req.user.email });
    console.log("user",user)
    
    const movieId = req.params.id;
    console.log("MovieId to delete",movieId)
    const watchlistItem = await Watchlist.findOne({
      movieId: movieId,
      user: user._id
    });

    if (!watchlistItem) {
      const errMsg = "Watchlist item cannot be found!";
      console.error(errMsg);
    }

    await watchlistItem.remove(); 
    res.json({ data: "Watchlist item removed" });
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err });
  }
}

//=============================================================

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    { user }, // data payload
    SECRET,
    { expiresIn: "24h" }
  );
}

function identifyKeyInMongooseValidationError(err) {
  let key = err.split("dup key: {")[1].trim();
  key = key.slice(0, key.indexOf(":"));
  return key.replace(/^./, (str) => str.toUpperCase());
}
