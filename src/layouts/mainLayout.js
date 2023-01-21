import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
//================================================

const MainLayout = (props) => {
  return (
    <>
      {props.children}
      <ToastContainer />
    </>
  );
};

export default MainLayout;
