import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./SignupPage.css";
import userService from "../../utils/userService";
import movieService from "../../utils/movieService";
import { Navigate, useNavigate } from "react-router-dom";
import NavbarNoSearch from '../../components/NavbarNoSearch/NavbarNoSearch';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function isPasswordMatch(passwordOne, passwordConf) {
  return passwordOne === passwordConf;
}

export default function SignUpPage({ handleSignUpOrLogin }) {
  //============STATE============================

  // const [error, setError] = useState({
  //   message: '',
  //   passwordError: false
  // })

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
  });

  const navigate = useNavigate();

  //===========FUNCTIONS============================

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  //--------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!isPasswordMatch(state.password, state.passwordConf)) return setError({message: 'Passwords Must Match!', passwordError: true});
    // setError({message: '', passwordError: false})

    try {
      await userService.signup(state);
      handleSignUpOrLogin();
      navigate("/");
    } catch (err) {
      console.log(err);
      // setError({message: err.message, passwordError: false});
    }
  };

  //--------------------------------------------------------------

  return (
    <>
      <NavbarNoSearch />
      <div className="form-container">
        <form onSubmit={handleSubmit} className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>

            <div className="form-group mt-3">
              <label className="formLabel">Username</label>
              <input
                name="username"
                value={state.username}
                onChange={handleChange}
                className="form-control mt-1"
                required
              />
            </div>

            <div className="form-group mt-3">
              <label className="formLabel">Email address</label>
              <input
                name="email"
                type="email"
                value={state.email}
                onChange={handleChange}
                className="form-control mt-1"
              />
            </div>

            <div className="form-group mt-3">
              <label className="formLabel">Password</label>
              <input
                // error={error.passwordError}
                name="password"
                type="password"
                value={state.password}
                onChange={handleChange}
                className="form-control mt-1"
              />
            </div>

            <div className="form-group mt-3">
              <label className="formLabel">Confirm Password</label>
              <input
                // error={error.passwordError}
                name="passwordConf"
                type="password"
                value={state.passwordConf}
                onChange={handleChange}
                className="form-control mt-1"
              />
            </div>

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-secondary">
                Submit
              </button>
            </div>
          </div>
          {/* {error ? <ErrorMessage error={error} /> : null} */}
        </form>
      </div>
    </>
  );
}
