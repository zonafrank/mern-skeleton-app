import React from "react";
import { Route, Navigate } from "react-router-dom";
import authHelper from "./auth-helper";

const PrivateRoute = (props) => {
  if (!authHelper.isAuthenticated()) {
    <Navigate to="/signin" replace="true" />;
  }

  return <>{props.children}</>;
};

export default PrivateRoute;
