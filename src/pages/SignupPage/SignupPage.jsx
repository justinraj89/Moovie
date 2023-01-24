import React, { useState } from "react";
import "./SignupPage.css";
import userService from "../../utils/userService";
import movieService from "../../utils/movieService";
import { Navigate, useNavigate } from "react-router-dom";
import NavbarNoSearch from "../../components/NavbarNoSearch/NavbarNoSearch";
//--------------------------------------------------
import { useFormik } from "formik";
import * as Yup from "yup";
import { showToast } from "../../utils/tools";
import { Alert } from "react-bootstrap";
//===================================================


export default function SignUpPage({ handleSignUpOrLogin }) {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: "", email: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Please enter a username"),
      email: Yup.string()
        .required("Please enter a valid email")
        .email("Email is not valid"),
      password: Yup.string().required("Please enter a password"),
    }),
    onSubmit: async (values) => {
      try {
        await userService.signup(values);
        handleSignUpOrLogin()
        navigate("/");
        showToast('SUCCESS', 'Welcome to Moovie! Thank you for signing up!')
      } catch (err) {
        console.log(err);
        showToast('ERROR', err.message)
      }
    },
  });

  return (
    <>
      <NavbarNoSearch />

      <div className="form-container">
        <form onSubmit={formik.handleSubmit} className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>

            <div className="form-group mt-3">
              <label className="formLabel">Username</label>
              <input
                type="text"
                name="username"
                className="form-control mt-1"
                {...formik.getFieldProps("username")}
              />
              {formik.errors.username && formik.touched.username ? (
                <Alert variant="danger">{formik.errors.username}</Alert>
              ) : null}
            </div>

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
