import Spinner from "react-bootstrap/Spinner";
import "./LoadingSpinner.css";

function LoadingSpinner() {
  return (
    <>
      <div className="spinnerContainer">
        <Spinner className="spinner" animation="border" variant="info" />
      </div>
      <br/>
      <div className="loadingprompt">Loading. Get the popcorn ready...</div>
    </>
  );
}

export default LoadingSpinner;
