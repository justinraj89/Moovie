import Spinner from "react-bootstrap/Spinner";
import "./LoadingSpinner.css";

function LoadingSpinner() {
  return (
    <>
      <div className="spinnerContainer">
        <Spinner className="spinner" animation="border" variant="info" />
      </div>
      <br/>
      <div className="loadingprompt">Loading...</div>
    </>
  );
}

export default LoadingSpinner;
