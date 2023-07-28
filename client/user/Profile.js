import React, { useEffect, useState } from "react";
import authHelper from "../auth/auth-helper";
import apiUser from "../user/api-user";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  makeStyles,
  Paper,
  Typography
} from "@material-ui/core";
import { Navigate, useParams } from "react-router-dom";
import { Person } from "@material-ui/icons";
import { Link } from "react-router-dom";
import DeleteUser from "./DeleteUser";
import { Edit } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5)
  },
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle
  }
}));

const Profile = () => {
  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const classes = useStyles();
  const params = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const jwt = authHelper.isAuthenticated();

    apiUser
      .read({ userId: params.userId }, { t: jwt.token }, signal)
      .then((data) => {
        if (data && data.error) {
          setRedirectToSignin(true);
        } else {
          setUser(data);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [params.userId]);

  if (Object.entries(user).length === 0 && redirectToSignin === false) {
    return null;
  }

  if (redirectToSignin) {
    return <Navigate to="/signin" />;
  }

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Person />
          </ListItemAvatar>
          {authHelper.isAuthenticated().user &&
            authHelper.isAuthenticated().user._id === user._id && (
              <ListItemSecondaryAction>
                <Link to={`/user/edit/${user._id}`}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteUser userId={user._id} />
              </ListItemSecondaryAction>
            )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={"joined " + new Date(user.created).toDateString()}
          />
        </ListItem>
      </List>
    </Paper>
  );
};

export default Profile;
