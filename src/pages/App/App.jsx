import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignupPage from "../SignupPage/SignupPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import LoginPage from "../LoginPage/LoginPage";
import userService from "../../utils/userService";
import Home from "../Home/Home";
import MovieDetail from "../MovieDetail/MovieDetail";

function App() {
  const [user, setUser] = useState(userService.getUser()); // getUser decodes our JWT token, into a javascript object
  // this object corresponds to the jwt payload which is defined in the server signup or login function that looks like
  // this  const token = createJWT(user); // where user was the document we created from mongo

  function handleSignUpOrLogin() {
    setUser(userService.getUser()); // getting the user from localstorage decoding the jwt
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  // if (user) {

  //IF USER IS LOGGED IN
  return (
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

      <Route path="/movie-details/:id" element={<MovieDetail />} />

      <Route path="/:username" element={<ProfilePage />} />

    </Routes>
  );
}

// IF USER IS NOT LOGGED IN
//   return (
//     <Routes>
//       <Route
//         path="/login"
//         element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
//       />
//       <Route
//         path="/signup"
//         element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
//       />
//       <Route path="/*" element={<Navigate to="/login" />} />
//     </Routes>
//   );
// }

export default App;
