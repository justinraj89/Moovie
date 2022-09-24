import React, { useState } from "react";
import "./LoginPage.css";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import Navbar from "../../components/Navbar/Navbar";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function LoginPage(props) {
  return (
    <>
    <Navbar />
    <div className="form-container">
    <form className="Auth-form">
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Log In</h3>
        
       
        <div className="form-group mt-3">
          <label>Email address</label>
          <input
            
            className="form-control mt-1"
            placeholder="Email Address"
          />
        </div>
        <div className="form-group mt-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control mt-1"
            placeholder="Password"
          />
        </div>
        
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      
      </div>
    </form>
  </div>
  </>
  );
}
