import "./LoginPage.css";
import userService from "../../utils/userService";
import NavbarNoSearch from '../../components/NavbarNoSearch/NavbarNoSearch';
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showToast } from "../../utils/tools";
import { Alert } from "react-bootstrap";
//==================================================


export default function LoginPage({ handleSignUpOrLogin }) {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: '' },
    validationSchema: Yup.object({
      email: Yup.string().required("Please enter your email"),
      password: Yup.string().required("Please enter a password"),
    }),
    onSubmit: async (values) => {
      try {
        await userService.login(values);
        handleSignUpOrLogin()
        navigate("/");
        showToast('SUCCESS', 'Welcome back!')
      } catch (err) {
        console.log(err);
        showToast('ERROR', 'Incorrect login information')
      }
    },
  });

  //--------------------------------------------------



  return (
    <>
    <NavbarNoSearch />
       <div className="form-container">
        <form onSubmit={formik.handleSubmit} className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Log In</h3>

            <div className="form-group mt-3">
              <label className="formLabel">Email</label>
              <input
                type="email"
                name="email"
                className="form-control mt-1"
                {...formik.getFieldProps("email")}
              />
              {formik.errors.email && formik.touched.email ? (
                <Alert variant="danger">{formik.errors.email}</Alert>
              ) : null}
            </div>

            <div className="form-group mt-3">
            <label className="formLabel">Password</label>
              <input
                type="password"
                name="password"
                className="form-control mt-1"
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password && formik.touched.password ? (
                <Alert variant="danger">{formik.errors.password}</Alert>
              ) : null}
            </div>

            <div className="d-grid gap-2 mt-4">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
