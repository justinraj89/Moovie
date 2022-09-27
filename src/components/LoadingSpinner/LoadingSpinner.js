import Spinner from 'react-bootstrap/Spinner';
import './LoadingSpinner.css'

function LoadingSpinner () {
  return (
    <>
        <Spinner className="spinner" animation="border" variant="info" />
        <div className="loadingprompt">Loading.. Please Wait</div>
    </>  
      
  );
}

export default LoadingSpinner;