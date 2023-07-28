import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import authHelper from "../auth/auth-helper";

const Menu = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit">
          MERN Skeleton
        </Typography>
        <NavLink to="/">
          <IconButton aria-label="Home">
            <Home />
          </IconButton>
        </NavLink>
        <NavLink to="/users">
          <Button>Users</Button>
        </NavLink>
        {!authHelper.isAuthenticated() && (
          <span>
            <NavLink
              to="/signup"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              <Button>Sign UP</Button>
            </NavLink>
            <NavLink
              to="/signin"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              <Button>Sign In</Button>
            </NavLink>
          </span>
        )}
        {authHelper.isAuthenticated() && (
          <span>
            <NavLink
              to={`/user/${authHelper.isAuthenticated().user._id}`}
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              <Button>My Profile</Button>
            </NavLink>
            <Button
              color="inherit"
              onClick={() => {
                authHelper.clearJwt(() => navigate("/"));
              }}
            >
              Sign Out
            </Button>
          </span>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
