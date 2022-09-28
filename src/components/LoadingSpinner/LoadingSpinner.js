import Spinner from "react-bootstrap/Spinner";
import "./LoadingSpinner.css";

function LoadingSpinner() {
  return (
    <>
      <div className="spinnerContainer">
        <Spinner className="spinner" animation="border" variant="info" />
      </div>
      <div className="loadingprompt">Loading.. Please Wait</div>
    </>
  );
}

export default LoadingSpinner;
