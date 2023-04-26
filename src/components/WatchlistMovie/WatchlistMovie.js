import "./WatchlistMovie.css";
import { LinkContainer } from "react-router-bootstrap";
import "./WatchlistMovie.css";
//============================================================

const WatchListMovie = (props) => {

  let linkUrl = "/movie-details/";
  let movieId = props.movieId;

  //==========================================================

  return (
    <>
      <div className="movie image-container">
        <LinkContainer to={linkUrl + movieId}>
          <img src={props.movieImg} alt={props.movieTitle}></img>
        </LinkContainer>
        <div
          onClick={props.handleRemoveFromWatchlist}
          className="removeOverlay d-flex align-items-center justify-content-center"
        >
          Remove from your Watchlist
        </div>
      </div>
    </>
  );
};

export default WatchListMovie;
