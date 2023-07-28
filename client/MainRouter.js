import React from "react";
import { Routes, Route, useMatch } from "react-router";
import Home from "./core/Home";
import Users from "./user/Users";
import Signup from "./user/Signup";
import Signin from "./auth/Signin";
import Profile from "./user/Profile";
import PrivateRoute from "./auth/PrivateRoute";
import EditProfile from "./user/EditProfile";
import Menu from "./core/Menu";

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/user/:userId"
          element={<Profile match={useMatch("/user/:userId")} />}
        />
        <Route
          path="/user/edit/:userId"
          element={
            <PrivateRoute>
              <EditProfile match={useMatch("/user/edit/:userId")} />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default MainRouter;
