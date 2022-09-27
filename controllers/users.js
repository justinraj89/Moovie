const User = require('../models/user');
const Watchlist = require('../models/watchlist')
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET


module.exports = {
  signup,
  login,
  profile
};

//=============================================================

async function signup(req, res) {
  console.log('hitting signup router')
  console.log(req.body, '<- req.body')
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
      res
        .status(423)
        .json({
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
    const user = await User.findOne({email: req.body.email});
    console.log(user, ' this user in login')
    if (!user) return res.status(401).json({err: 'bad credentials'});
    // had to update the password from req.body.pw, to req.body password
    user.comparePassword(req.body.password, (err, isMatch) => {
        
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json({err: 'error message'});
  }
}

//=============================================================

async function profile(req, res) {
  try {
    // find the user!
    const user = await User.findOne({ username: req.params.username });
    // if the user is undefined, that means the database couldn't find this user lets send an error back
    if (!user) return res.status(404).json({ error: "User not found" });

    // Find the Post's by the user
    //.populate('user') <- user comes from the key on the post model 
    //   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // referencing a model < which replaces the id with the userdocument
    const watchlistMovies = await Watchlist.find({ user: user._id }).populate("user").exec();
    res.status(200).json({
      data: {
        user: user,
        watchlistMovies: watchlistMovies,
      }
    });
  } catch (err) {
    console.log(err.message, " <- profile controller");
    res.status(400).json({ error: "Something went wrong" });
  }
}

//=============================================================

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}

function identifyKeyInMongooseValidationError(err) {
  let key = err.split("dup key: {")[1].trim();
  key = key.slice(0, key.indexOf(":"));
  return key.replace(/^./, (str) => str.toUpperCase());
}
