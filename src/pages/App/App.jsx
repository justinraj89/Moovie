import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignupPage from "../SignupPage/SignupPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import LoginPage from "../LoginPage/LoginPage";
import userService from "../../utils/userService";
import Home from "../Home/Home";
import MovieDetail from "../MovieDetail/MovieDetail";
import MainLayout from "../../layouts/mainLayout";
//=======================================================

function App() {
  const [user, setUser] = useState(userService.getUser()); 

  function handleSignUpOrLogin() {
    setUser(userService.getUser()); 
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  if (user) {

    return (
      <MainLayout>
        <Routes>
          <Route
            path="/"
            element={<Home handleLogout={handleLogout} user={user} />}
          />
          <Route
            path="/login"
            element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
          />
          <Route
            path="/signup"
            element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
          />
          <Route
            path="/movie-details/:id"
            element={<MovieDetail handleLogout={handleLogout} user={user} />}
          />
          <Route
            path="/:username"
            element={<ProfilePage handleLogout={handleLogout} user={user} />}
          />
        </Routes>
      </MainLayout>
    );
  }

  // // IF USER IS NOT LOGGED IN
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/movie-details/:id"
          element={<MovieDetail handleLogout={handleLogout} user={user} />}
        />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
